package com.example.medisync;

import org.apache.commons.lang3.StringUtils;


public class AccountSettings {
    // Replace MASTER_KEY and HOST with values from your Azure Cosmos DB account.
    // The default values are credentials of the local emulator, which are not used in any production environment.
    // <!--[SuppressMessage("Microsoft.Security", "CS002:SecretInNextLine")]-->
    public static String MASTER_KEY =
            System.getProperty("ACCOUNT_KEY",
                    StringUtils.defaultString(StringUtils.trimToNull(
                                    System.getenv().get("ACCOUNT_KEY")),
                            "5SpbO4gdzFZUsB7akwGdYNmBjLKOxgAMXHt9D2crOnyoETB8qU2nWhDLvRpcWIhnQR4FJ4PidJ4KACDbW2Gxng=="));

    public static String HOST =
            System.getProperty("ACCOUNT_HOST",
                    StringUtils.defaultString(StringUtils.trimToNull(
                                    System.getenv().get("ACCOUNT_HOST")),
                            "https://chigi.documents.azure.com:443/"));
}