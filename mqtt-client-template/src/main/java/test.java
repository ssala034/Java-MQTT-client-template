import java.util.Random;
import java.util.concurrent.TimeUnit;

public class test {
    public static void main(String[] args) {
        Client client = new Client();
        Random random = new Random();

        int idLength = 8;
        int minValue = (int) Math.pow(10, idLength - 1); // Minimum 8-digit number (e.g., 10000000)
        int maxValue = (int) Math.pow(10, idLength) - 1; // Maximum 8-digit number (e.g., 99999999)
        System.out.println("Validating generated generated Client.java");
        System.out.println("Running tests in test.java");
        System.out.println("Sending temperature changes to the broker...");
        System.err.println("\n");
        while (true) {
            int randomId = random.nextInt(maxValue - minValue + 1) + minValue;
            client.sendTemperatureDrop(String.valueOf(randomId));
            System.out.println("Temperature drop detected " + randomId + " sent to temperature/dropped");
            
            client.sendTemperatureRise(String.valueOf(randomId));
            System.out.println("Temperature risen detected " + randomId + " sent to temperature/risen");

            try {
                TimeUnit.SECONDS.sleep(1); // Sleep for 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
