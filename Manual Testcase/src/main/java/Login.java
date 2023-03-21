import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


public class Login {

    public boolean login(Integer sdt) {
        List<Integer> list = new ArrayList<>();
        list.add(012);
        list.add(345);
        list.add(013);
        boolean kq =false;
        for (Integer dt: list
             ) {
            if (dt==sdt) {
                kq = true;

            } else {
                kq = false;

            }

        }
        return kq;
    }
}
