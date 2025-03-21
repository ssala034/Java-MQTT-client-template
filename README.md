# A template for Java MQTT client that can generate java code using AsyncAPI generator.
  - Inspired by `https://www.asyncapi.com/docs/tools/generator/generator-template`

The client code is currently generated using asyncapi.yml is `src/fixtures`.
Changed the AsyncAPI document given to the generaotr to fix your business needs.

To run it ensure your have java jdk 8 or higher, gradle, and async api generator.

Follow `https://www.asyncapi.com/docs/tools/generator` to get asyncapi generator.
Get gradle at `https://gradle.org/install/` and JDK at `https://www.oracle.com/ca-en/java/technologies/downloads/`

#### How it works
Run gradle build

Run npm test at root of mqtt-client-template 

View generated client code in `src/main/java`
