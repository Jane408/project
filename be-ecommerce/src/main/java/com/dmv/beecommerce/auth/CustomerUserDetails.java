package com.dmv.beecommerce.auth;
import com.dmv.beecommerce.admin.Admin;
import com.dmv.beecommerce.customer.Customer;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CustomerUserDetails implements UserDetails {
     private String userName;
     private String password;

     private final Collection<? extends GrantedAuthority> authorities;

    public CustomerUserDetails(Admin admin) {
        this.userName = admin.getUserName();
        this.password = admin.getPassword();
        this.authorities = List.of(new SimpleGrantedAuthority(admin.getRole().name()));
    }

    public CustomerUserDetails(Customer customer) {
        this.userName = customer.getUserName();
        this.password = customer.getPassword();
        this.authorities = List.of(new SimpleGrantedAuthority(customer.getRole().name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
