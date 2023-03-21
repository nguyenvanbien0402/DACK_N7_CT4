import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


public class Seach {


    public String seachProduct(String tenSanPham) {

        List<String> listProduct = new ArrayList<>();
        listProduct.add("iphone 11");
        listProduct.add("iphone 13");
        listProduct.add("samsung a13");
        listProduct.add("nokia ");
        listProduct.add("motorona 13");
        String dt = null;
        for (String data: listProduct
             ) {
            if (tenSanPham == data) {
                System.out.println(data);
                 dt = data;
            } else {
                System.out.println("sản phẩm không tồn tại");
            }
        }
       return dt;
    }
}
