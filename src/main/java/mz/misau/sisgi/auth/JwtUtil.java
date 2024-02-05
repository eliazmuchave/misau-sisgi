package mz.misau.sisgi.auth;

import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import mz.misau.sisgi.entity.User;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {
    private final String secret_key = "mysecretkey";
    private final JwtParser jwtParser;
    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_PREFIX = "Bearer ";
    private long accessTokenValidity = 60 * 60 * 1000;

    public JwtUtil() {
        this.jwtParser = Jwts.parser().setSigningKey(secret_key);

    }

    public String createToken(User user) {
        Claims claims = Jwts.claims()
                .setSubject(user.getEmail());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        Date tokenCreateTime = new Date();
        Date tokenvalidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis((accessTokenValidity)));

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenvalidity)
                .signWith(SignatureAlgorithm.HS256, secret_key)
                .compact();
    }

    private Claims parseJwtClaims(String token) {
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public Claims resolveClaims(HttpServletRequest request) {
        try {
            String token = resolveToken(request);
            if (token != null) {
                return parseJwtClaims(token);
            }
            return null;
        } catch (ExpiredJwtException ex) {
            request.setAttribute("expired", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            request.setAttribute("invalid", ex.getMessage());
            throw ex;
        }
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(TOKEN_HEADER);
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }

        return null;

    }

    public boolean validateClaims(Claims claims) {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            throw e;

        }
    }

    public String getEmail(Claims claims) {
        return claims.getSubject();
    }

    public String getEmailFromToken(String authorization){
        String token = authorization.substring(authorization.indexOf(" "));
        System.out.println(token);
        Claims claims = parseJwtClaims(token);
       return getEmail(claims);
    }

    private List<String> getRoles(Claims claims) {
        return (List<String>) claims.get("roles");
    }
}
