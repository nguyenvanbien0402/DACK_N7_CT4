import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


public class Register {


    public boolean register(int sdt) {
        List<Integer> list = new ArrayList<>();
        list.add(sdt);
        boolean kq=false;
        for (Integer dt: list
             ) {
            if (sdt==dt) {
                kq=true;
            }else {
                kq=false;
            }
        }
        return kq;

    }
}
