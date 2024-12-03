package com.dmv.beecommerce.auth;
import com.dmv.beecommerce.admin.Admin;
import com.dmv.beecommerce.admin.AdminRepository;
import com.dmv.beecommerce.customer.Customer;
import com.dmv.beecommerce.customer.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private AdminRepository adminRepository;
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> adminOptional = adminRepository.findByUserName(username);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            return createUserDetails(admin.getUserName(), admin.getPassword(), admin.getRole());
        }

        Optional<Customer> customerOptional = customerRepository.findByUserName(username);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return createUserDetails(customer.getUserName(), customer.getPassword(), customer.getRole());
        }
        throw new UsernameNotFoundException("User not found");
    }

    private UserDetails createUserDetails(String userName, String password, Role roles) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(roles.toString());
        return new CustomerUserDetails(userName, password, Set.of(grantedAuthority));
    }


}
