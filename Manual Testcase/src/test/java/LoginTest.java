import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;



public class LoginTest {



    @Test
    public void LoginTest() {

        Login lg = new Login();

        Assertions.assertEquals(true, lg.login(013));

    }
}
