'use strict';

require('source-map-support/register');
var generatorReactSdk = require('@asyncapi/generator-react-sdk');
var jsxRuntime = require('C:/Users/shuai/AppData/Roaming/npm/node_modules/@asyncapi/cli/node_modules/@asyncapi/generator/node_modules/react/cjs/react-jsx-runtime.production.min.js');

/*
 * This component returns a block of functions that user can use to send messages to specific topic.
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */
function TopicFunction({
  channels
}) {
  const topicsDetails = getTopics(channels);
  let functions = '';
  topicsDetails.forEach(t => {
    functions += `public void send${t.name}(String id) {
        String topic = "${t.topic}";
        try {
            MqttMessage message = new MqttMessage(id.getBytes());
            client.publish(topic, message);
            System.out.println("Temperature change sent: " + id);
        } catch (MqttException e) {
            e.printStackTrace();
        }
        }`;
  });
  return functions;
}

/*
 * This function returns a list of objects, one for each channel with two properties, name and topic
 * name - holds information about the operationId provided in the AsyncAPI document
 * topic - holds information about the address of the topic
 *
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */
function getTopics(channels) {
  const channelsCanSendTo = channels;
  let topicsDetails = [];
  channelsCanSendTo.forEach(ch => {
    const topic = {};
    const operationId = ch.operations().filterByReceive()[0].id();
    topic.name = operationId.charAt(0).toUpperCase() + operationId.slice(1);
    topic.topic = ch.address();
    topicsDetails.push(topic);
  });
  return topicsDetails;
}

function index ({
  asyncapi,
  params
}) {
  let channels = asyncapi.channels().filterByReceive(); // Get all the channels that receive messages

  // Generate Java code for each topic dynamically using TopicFunction
  const topicMethods = TopicFunction({
    channels
  }); // This will return Java methods as text

  return /*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.File, {
    name: "client.java",
    children: `import org.eclipse.paho.client.mqttv3.*;

        public class client {
            private static final String BROKER_URL = "${asyncapi.servers().get(params.server).url()}";
            private static final String TOPIC = "temperature/changed";

            private MqttClient client;

            public client() {
                try {
                    // Generate a unique client ID
                    String clientId = MqttClient.generateClientId();
                    
                    // Create and connect the MQTT client
                    client = new MqttClient(BROKER_URL, clientId);
                    MqttConnectOptions options = new MqttConnectOptions();
                    options.setCleanSession(true);
                    
                    client.connect(options);
                    System.out.println("Connected to MQTT broker: " + BROKER_URL);
                } catch (MqttException e) {
                    e.printStackTrace();
                }
            }

            ${topicMethods}

            public static void main(String[] args) {
                client serviceClient = new client();
                
                // Simulate sending a temperature change
                //serviceClient.sendTemperatureDrop("Sensor-1: 25°C");
            }
        }`
  });
}

module.exports = index;
//# sourceMappingURL=index.js.map
