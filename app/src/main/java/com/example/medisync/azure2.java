package com.example.medisync;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import com.azure.cosmos.ConsistencyLevel;
import com.azure.cosmos.CosmosClient;
import com.azure.cosmos.CosmosClientBuilder;
import com.azure.cosmos.CosmosException;
import com.azure.cosmos.CosmosContainer;
import com.azure.cosmos.CosmosDatabase;
import com.azure.cosmos.models.CosmosContainerProperties;
import com.azure.cosmos.models.CosmosItemRequestOptions;
import com.azure.cosmos.models.CosmosItemResponse;
import com.azure.cosmos.models.PartitionKey;
import com.azure.cosmos.models.CosmosQueryRequestOptions;
import com.azure.cosmos.models.CosmosContainerResponse;
import com.azure.cosmos.models.CosmosDatabaseResponse;
import com.azure.cosmos.models.ThroughputProperties;
import com.azure.cosmos.util.CosmosPagedIterable;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class azure2 extends AppCompatActivity {
    private CosmosClient client;

    private final String databaseName = "ToDoList1";
    private final String containerName = "Items1";

    private CosmosDatabase database;
    private CosmosContainer container;


    Button B1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_azure2);
        B1=findViewById(R.id.button2);
        B1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    getStartedDemo();
                    displayToast("Demo complete, please hold while resources are released");
                    // Close the CosmosClient here if necessary

                } catch (Exception e) {
                    e.printStackTrace();
                    displayToast("Cosmos getStarted failed with " + e.toString());
                }

            }
        });



    }

    private void displayToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    private void getStartedDemo() throws Exception {
        displayToast("Using Azure Cosmos DB endpoint: " + AccountSettings.HOST);

        ArrayList<String> preferredRegions = new ArrayList<String>();
        preferredRegions.add("West US");

        //  Create sync client
        client = new CosmosClientBuilder()
                .endpoint(AccountSettings.HOST)
                .key(AccountSettings.MASTER_KEY)
                .preferredRegions(preferredRegions)
                .userAgentSuffix("CosmosDBJavaQuickstart")
                .consistencyLevel(ConsistencyLevel.EVENTUAL)
                .buildClient();
        if (client != null) {
            displayToast("Connection to Azure Cosmos DB established.");
        } else {
            displayToast("Failed to establish a connection to Azure Cosmos DB.");
        }

        createDatabaseIfNotExists();
        createContainerIfNotExists();
        scaleContainer();


        ArrayList<Family> familiesToCreate = new ArrayList<>();
        familiesToCreate.add(Families.getAndersenFamilyItem());
        familiesToCreate.add(Families.getWakefieldFamilyItem());
        familiesToCreate.add(Families.getJohnsonFamilyItem());
        familiesToCreate.add(Families.getSmithFamilyItem());

        createFamilies(familiesToCreate);
//
//        displayToast("Reading items.");
//        readItems(familiesToCreate);
//
//        displayToast("Querying items.");
//        queryItems();
    }

    private void createDatabaseIfNotExists() throws Exception {
        displayToast("Create database " + databaseName + " if not exists.");

        //  Create database if not exists
        CosmosDatabaseResponse databaseResponse = client.createDatabaseIfNotExists(databaseName);
        database = client.getDatabase(databaseResponse.getProperties().getId());

        displayToast("Checking database " + database.getId() + " completed!\n");
    }

    private void createContainerIfNotExists() throws Exception {
        displayToast("Create container " + containerName + " if not exists.");

        //  Create container if not exists
        CosmosContainerProperties containerProperties =
                new CosmosContainerProperties(containerName, "/partitionKey");

        CosmosContainerResponse containerResponse = database.createContainerIfNotExists(containerProperties);
        container = database.getContainer(containerResponse.getProperties().getId());

        displayToast("Checking container " + container.getId() + " completed!\n");
    }

    private void scaleContainer() throws Exception {
        displayToast("Scaling container " + containerName + ".");

        try {
            // You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
            ThroughputProperties currentThroughput = container.readThroughput().getProperties();
            int newThroughput = currentThroughput.getManualThroughput() + 100;
            container.replaceThroughput(ThroughputProperties.createManualThroughput(newThroughput));
            displayToast("Scaled container to " + newThroughput + " completed!\n");
        } catch (CosmosException e) {
            if (e.getStatusCode() == 400) {
                displayToast("Cannot read container throughput.");
                displayToast(e.getMessage());
            } else {
                throw e;
            }
        }
    }

    private void createFamilies(List<Family> families) throws Exception {
        double totalRequestCharge = 0;
        for (Family family : families) {
            //  Create item using container that we created using sync client
            //  Using appropriate partition key improves the performance of database operations
            CosmosItemResponse item = container.createItem(family, new PartitionKey(family.getPartitionKey()), new CosmosItemRequestOptions());
            //  Get request charge and other properties like latency, and diagnostics strings, etc.
            displayToast(String.format("Created item with request charge of %.2f within duration %s",
                    item.getRequestCharge(), item.getDuration()));
            totalRequestCharge += item.getRequestCharge();
        }
        displayToast(String.format("Created %d items with a total request charge of %.2f",
                families.size(),
                totalRequestCharge));
    }

    private void readItems(ArrayList<Family> familiesToCreate) {
//        //  Using partition key for point read scenarios.
//        //  This will help fast look up of items because of the partition key
        familiesToCreate.forEach(family -> {
            try {
                CosmosItemResponse<Family> item = container.readItem(family.getId(), new PartitionKey(family.getPartitionKey()), Family.class);
                double requestCharge = item.getRequestCharge();
                Duration requestLatency = item.getDuration();
                displayToast(String.format("Item successfully read with id %s with a charge of %.2f and within duration %s",
                        item.getItem().getId(), requestCharge, requestLatency));
            } catch (CosmosException e) {
                e.printStackTrace();
                displayToast(String.format("Read Item failed with %s", e));
            }
        });
    }

    private void queryItems() {
        // Set some common query options
        int preferredPageSize = 10;
        CosmosQueryRequestOptions queryOptions = new CosmosQueryRequestOptions();
        //  Set populate query metrics to get metrics around query executions
        queryOptions.setQueryMetricsEnabled(true);

        CosmosPagedIterable<Family> familiesPagedIterable = container.queryItems(
                "SELECT * FROM Family WHERE Family.partitionKey IN ('Andersen', 'Wakefield', 'Johnson')", queryOptions, Family.class);
        familiesPagedIterable.iterableByPage(preferredPageSize).forEach(cosmosItemPropertiesFeedResponse -> {
            displayToast("Got a page of query result with " +
                    cosmosItemPropertiesFeedResponse.getResults().size() + " item(s)" +
                    " and request charge of " + cosmosItemPropertiesFeedResponse.getRequestCharge());

            displayToast("Item Ids " + cosmosItemPropertiesFeedResponse
                    .getResults()
                    .stream()
                    .map(Family::getId)
                    .collect(Collectors.toList()));
        });
    }
}

