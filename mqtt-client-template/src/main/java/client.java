import org.eclipse.paho.client.mqttv3.*;

        public class client {
            private static final String BROKER_URL = "tcp://test.mosquitto.org:1883";
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

            public void sendTemperatureDrop(String id) {
        String topic = "temperature/dropped";
        try {
            MqttMessage message = new MqttMessage(id.getBytes());
            client.publish(topic, message);
            System.out.println("Temperature change sent: " + id);
        } catch (MqttException e) {
            e.printStackTrace();
        }
        }public void sendTemperatureRise(String id) {
        String topic = "temperature/risen";
        try {
            MqttMessage message = new MqttMessage(id.getBytes());
            client.publish(topic, message);
            System.out.println("Temperature change sent: " + id);
        } catch (MqttException e) {
            e.printStackTrace();
        }
        }

            public static void main(String[] args) {
                client serviceClient = new client();
                
                // Simulate sending a temperature change
                //serviceClient.sendTemperatureDrop("Sensor-1: 25°C");
            }
        }