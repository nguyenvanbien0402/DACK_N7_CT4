import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


public class Buy {
    public boolean Buy(int giathucte,int soluong, int gia) {
        List<Integer> listPrice = new ArrayList<>();
        boolean kq=false;
        int TotalPrice = soluong*gia;
        if (giathucte == TotalPrice) {
            kq=true;
        }
        return kq;
    }

     public boolean insert(String tenHang) {
        List<String> sanpham = new ArrayList<>();
        sanpham.add(tenHang);
        boolean kq=false;
         for (String sp: sanpham
              ) {
             if (sp.equals(tenHang))
             {
                 kq=true;
             }
         }
         return kq;
    }

    public boolean delete(String tenHang) {
        List<String> sanpham = new ArrayList<>();
        sanpham.add("iphone");
        boolean kq = false;
       for (int i=0;i<sanpham.size();i++)
       {
           if (sanpham.get(i)==tenHang) {
               sanpham.remove(i);
               kq=true;
           }
       }

        return kq;
    }
}
