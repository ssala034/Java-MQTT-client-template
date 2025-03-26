/**
 * Note: This client code is only based on the current asyncapi.yml code!!
 * If you want to use this client code, you need to update the code based on the asyncapi.yml file.
 * Once updated the asyncapi.yml file, 
 *              you can generate the client code using the following command: npm test
 * 
 * 
 */
import org.eclipse.paho.client.mqttv3.*;

public class Client {
    private static final String BROKER_URL = "tcp://test.mosquitto.org:1883";
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

    
    public void sendTemperatureDrop(String id) {
        String topic = "temperature/dropped";
        try {
            MqttMessage message = new MqttMessage(id.getBytes());
            client.publish(topic, message);
            System.out.println("TemperatureDrop change sent: " + id);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void sendTemperatureRise(String id) {
        String topic = "temperature/risen";
        try {
            MqttMessage message = new MqttMessage(id.getBytes());
            client.publish(topic, message);
            System.out.println("TemperatureRise change sent: " + id);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        Client serviceClient = new Client();
                
        // Simulate sending a temperature change
        //serviceClient.sendTemperatureDrop("Sensor-1: 25°C");
    }
}