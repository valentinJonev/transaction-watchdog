CREATE TABLE "DynamicConfigurations" (
    "id" serial PRIMARY KEY,
    "configJson" JSON NOT NULL,
    "delayed" BOOLEAN,
    "network" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP
);

CREATE TABLE "Transactions" (
    "id" serial PRIMARY KEY,
    "transactionJson" JSON NOT NULL,
    "DynamicConfigurationId" INTEGER REFERENCES "DynamicConfigurations" ("id") ON UPDATE CASCADE,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP
);