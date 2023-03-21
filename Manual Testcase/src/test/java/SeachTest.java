import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SeachTest {



    @Test
    public void seachTest() {
        Seach seach = new Seach();
        Assertions.assertEquals("iphone 13", seach.seachProduct("iphone 13"));
    }

}
