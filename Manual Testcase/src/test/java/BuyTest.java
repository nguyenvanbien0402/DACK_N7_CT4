import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class BuyTest {


    @Test
    public void buyTest () {
        Buy b = new Buy();
        Assertions.assertEquals(true, b.Buy(20,10,2));
    }

    @Test
    public void insert () {
        Buy b = new Buy();
        Assertions.assertEquals(true, b.insert("iphone"));
    }

    @Test
    public void delete () {
        Buy b = new Buy();
        Assertions.assertEquals(true, b.delete("iphone"));
    }
}
