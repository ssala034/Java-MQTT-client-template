import { File, Text } from '@asyncapi/generator-react-sdk';
import { TopicFunction } from '../components/TopicFunction'

export default function ({ asyncapi, params }) {
    let channels = asyncapi.channels().filterByReceive();  // Get all the channels that receive messages

    // Generate Java code for each topic dynamically using TopicFunction
    const topicMethods = TopicFunction({ channels });  // This will return Java methods as text
    
    return (
    <File name="Client.java">
    {
      
`import org.eclipse.paho.client.mqttv3.*;

public class Client {
    private static final String BROKER_URL = "${asyncapi.servers().get(params.server).url()}";
    private static final String TOPIC = "temperature/changed";

    private MqttClient client;

    public Client() {
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
        Client serviceClient = new Client();
                
        // Simulate sending a temperature change
        //serviceClient.sendTemperatureDrop("Sensor-1: 25°C");
    }
}`
    }
    </File>
  );
}
