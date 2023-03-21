import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;



public class RegisterTest {


    @Test
    public void RegisterTest() {

        Register rg = new Register();
        Assertions.assertEquals(true, rg.register(02125252));

    }
}
