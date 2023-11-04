import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const tableName;

export async function GET(request: Request) {
  if (!accessKeyId || !secretAccessKey) {
    return NextResponse.json({ error: "missing required credentials" });
  }

  const client = new DynamoDBClient({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region: "us-east-1",
  });

  // const command = new ListTablesCommand({});

  // const response = await client.send(command);
  // console.log(response.TableNames?.join("\n"));

  // return NextResponse.json({
  //   message: "Hello world",
  //   request: JSON.stringify(request),
  //   response,
  // });

  /**
   * Create a table.
   */

  const createTableCommand = new CreateTableCommand({
    TableName: tableName,
    // This example performs a large write to the database.
    // Set the billing mode to PAY_PER_REQUEST to
    // avoid throttling the large write.
    BillingMode: BillingMode.PAY_PER_REQUEST,
    // Define the attributes that are necessary for the key schema.
    AttributeDefinitions: [
      {
        AttributeName: "year",
        // 'N' is a data type descriptor that represents a number type.
        // For a list of all data type descriptors, see the following link.
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
        AttributeType: "N",
      },
      { AttributeName: "title", AttributeType: "S" },
    ],
    // The KeySchema defines the primary key. The primary key can be
    // a partition key, or a combination of a partition key and a sort key.
    // Key schema design is important. For more info, see
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html
    KeySchema: [
      // The way your data is accessed determines how you structure your keys.
      // The movies table will be queried for movies by year. It makes sense
      // to make year our partition (HASH) key.
      { AttributeName: "year", KeyType: "HASH" },
      { AttributeName: "title", KeyType: "RANGE" },
    ],
  });

  console.log("Creating a table.");
  const createTableResponse = await client.send(createTableCommand);
}
