package com.example.identityservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderId;

    //Payment to COD
    String fullName;
    String phoneNumber;
    String country;
    String city;
    String district;
    String ward;
    String address;
    String paymentMethod;

    //Payment to VNPay
    String vnpTxnRef;
    String vnpOrderInfo;
    BigDecimal vnpAmount;
    String vnpResponseCode;
    String vnpTransactionNo;
    String vnpPayDate;
    String vnpTransactionStatus;

    @OneToMany
//    @JsonManagedReference
    Set<SelectedProduct> selectedProducts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    User user;

    @Override
    public String toString() {
        return "Orders{" +
                "orderId='" + orderId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", district='" + district + '\'' +
                ", ward='" + ward + '\'' +
                ", address='" + address + '\'' +
                ", vnpTxnRef='" + vnpTxnRef + '\'' +
                ", vnpAmount='" + vnpAmount + '\'' +
                ", vnpResponseCode='" + vnpResponseCode + '\'' +
                ", vnpTransactionNo='" + vnpTransactionNo + '\'' +
                ", vnpPayDate='" + vnpPayDate + '\'' +
                ", vnpTransactionStatus='" + vnpTransactionStatus + '\'' +
                '}';
    }
}
