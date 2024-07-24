package com.example.notification.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String userId;
    String username;
    String firstName;
    String lastName;
    Boolean noPassword;
    Set<RoleResponse> roles;
    Set<CartItemResponse> cartItem;
    //    Set<SelectedProductResponse> selectedProducts;
    Set<OrdersResponse> orders;
}
