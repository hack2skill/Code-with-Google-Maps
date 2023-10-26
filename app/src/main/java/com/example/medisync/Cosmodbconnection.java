package com.example.medisync;

import android.content.Context;
import android.widget.Toast;
import com.azure.cosmos.*;
import com.azure.cosmos.implementation.ConnectionPolicy;


public class Cosmodbconnection {
    private Context context;

    public Cosmodbconnection(Context context) {
        this.context = context;
    }

    public CosmosClient createClient() {
        // Replace with your Azure Cosmos DB endpoint and master key
        String endpoint = "https://chigi.documents.azure.com:443/";
        String masterKey = "5SpbO4gdzFZUsB7akwGdYNmBjLKOxgAMXHt9D2crOnyoETB8qU2nWhDLvRpcWIhnQR4FJ4PidJ4KACDbW2Gxng==";

        try {
            // Create a CosmosClient instance
            CosmosClient cosmosClient = new CosmosClientBuilder()
                    .endpoint(endpoint)
                    .key(masterKey)// Choose your desired consistency level
                    .buildClient();

            // Check if the client is not null, indicating a successful connection
            if (cosmosClient != null) {
                Toast.makeText(context, "Connected to Azure Cosmos DB.", Toast.LENGTH_SHORT).show();
                return cosmosClient;
            } else {
                Toast.makeText(context, "Failed to connect to Azure Cosmos DB.", Toast.LENGTH_SHORT).show();
                return null;
            }
        } catch (Exception e) {
            Toast.makeText(context, "Exception: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            e.printStackTrace(); // Log the full stack trace
            return null;
        }
    }
}
