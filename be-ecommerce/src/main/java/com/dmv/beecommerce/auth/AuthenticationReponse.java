package com.dmv.beecommerce.auth;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationReponse {
    private String token;
    private Integer id;
    private String role;
    private Integer cartId;
}
