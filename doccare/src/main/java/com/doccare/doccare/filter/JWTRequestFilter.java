package com.doccare.doccare.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.doccare.doccare.utils.JWTUtil;

@Component
public class JWTRequestFilter extends OncePerRequestFilter{

    private Logger logger = LoggerFactory.getLogger(JWTRequestFilter.class);
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final RequestMatcher ignoredPaths = new AntPathRequestMatcher("/api/v1/authenticate");
        final RequestMatcher ignoredPaths2 = new AntPathRequestMatcher("/api/v1/register");
        final RequestMatcher ignoredPaths3 = new AntPathRequestMatcher("/api/v1/verify"); // this is a temporary stuff
        final RequestMatcher ignoredPaths4 = new AntPathRequestMatcher("/api/v1/docreg"); // this is a temporary stuff
        final RequestMatcher ignoredPaths5 = new AntPathRequestMatcher("/api/v1/conreg"); // this is a temporary stuff
        final RequestMatcher ignoredPaths6 = new AntPathRequestMatcher("/api/v1/forgetpassword");
        final RequestMatcher ignoredPaths7 = new AntPathRequestMatcher("/api/v1/verifyforgetpassword");
        final RequestMatcher ignoredPaths8 = new AntPathRequestMatcher("/api/v1/redirectforgetpass"); 
        final RequestMatcher ignoredPaths9 = new AntPathRequestMatcher("/api/v1/resetpass"); 
        final RequestMatcher ignoredPaths10 = new AntPathRequestMatcher("/api/v1/generateotp"); 
        final RequestMatcher ignoredPaths11 = new AntPathRequestMatcher("/api/v1/role"); 
        final RequestMatcher ignoredPaths12 = new AntPathRequestMatcher("/api/v1/verifyotp"); 
        final RequestMatcher ignoredPaths13 = new AntPathRequestMatcher("/api/v1/userexists"); 
        final RequestMatcher ignoredPaths14 = new AntPathRequestMatcher("/api/v1/profileImg"); 
        final RequestMatcher ignoredPaths15 = new AntPathRequestMatcher("/api/v1/doctors"); 





        if (ignoredPaths.matches(request)) { 
            filterChain.doFilter(request, response);
            return;
       }
        if (ignoredPaths2.matches(request)) { 
        filterChain.doFilter(request, response);
        return;

        }

        if(ignoredPaths3.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }

        if(ignoredPaths4.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths5.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        
        if(ignoredPaths6.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths7.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }

        if(ignoredPaths8.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths9.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths10.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths11.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths12.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }

        if(ignoredPaths13.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths14.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        if(ignoredPaths15.matches(request)) {
            filterChain.doFilter(request,response);
            return;
        }

        String jwtToken = request.getHeader("Authorization");
        String userName = null;
        String token = null;

        
        if (jwtToken.contains("Bearer")) {
            String[] splitedToken = jwtToken.split(" ");
            token = splitedToken[1];
            userName = this.jwtUtil.getUsernameFromToken(token);

            // now I have to parse the token for the user info
            
        } else {
            logger.warn("Token does not begin with beaerer");
        }


        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);

            if (this.jwtUtil.validateToken(token, userDetails)) {

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}

        }
        
        filterChain.doFilter(request, response);
    }
    
}
