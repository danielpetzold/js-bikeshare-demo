import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.*;

public class TokenBuilder {
    
    private String UserNameFragment = "u=%s|";
    
    private String RolesFragment = "r=%s|";
    
    private String OrganizationFragment = "o=%s|";
    
    private String ExpirationFragment = "exp=%s|";
    
    private String ClientIdFragment = "cId=%s|";    
    
    private String _userName;
    
    private String _expiration;
    
    private String _clientId;
    
    private String _userId;
    
    private List<String> _roles = new ArrayList<String>();
    
    private List<String> _organizations = new ArrayList<String>();
    
    private String datePattern = "yyyyMMddHHmmss";
    
    private DateFormat dateFormat = new SimpleDateFormat(datePattern);  
    
    public final TokenBuilder setUserName(String userName) {
        this._userName = userName;
        return this;
    }
    
    public final String getUserName()
    {
    	return this._userName;
    }
    
    public final TokenBuilder setRoles(List<String> roles) {
        this._roles = roles;
        return this;
    }
    
    public final List<String> getRoles()
    {
    	return this._roles;
    }
    
    public final TokenBuilder setOrganizations(List<String> organizations) {
        this._organizations = organizations;
        return this;
    }
    
    public final List<String> getOrganizations()
    {
    	return this._organizations;
    }
    
    public final TokenBuilder setExpiration(Date expirationDateTime) {    	    	  	
        this._expiration = dateFormat.format(expirationDateTime);
        return this;
    }
    
    public final String getExpiration()
    {
    	return this._expiration;
    }
    
    public final TokenBuilder setClientId(String clientId) {
        this._clientId = clientId;
        return this;
    }
    
    public final String getClientId()
    {
    	return this._clientId;
    }
    
    public final TokenBuilder setUserId(String userId) {
        this._userId = userId;
        return this;
    }
    
    public final String getUserId()
    {
    	return this._userId;
    }
    
    
    public final boolean isValid()
    {    	
    	// these are the only required fields
    	if (this._organizations.isEmpty()) {
    		return false;
    	}
    	
    	if (StringUtils.isAllBlank(this._userName)) {
    		return false;
    	}
    	
    	if (this._roles.isEmpty()) {
    		return false;
    	}    		
    	
    	return true;
    }
    
   
	public final String build() {
    	TextStringBuilder builder = new TextStringBuilder();
    	
    	if (!StringUtils.isAllBlank(this._userName)) {
    		 builder.append(UserNameFragment, this._userName);
    	}             
        
        if (!this._roles.isEmpty()) {
            builder.append(RolesFragment, String.join(",", this._roles));
        }
        
        if (!this._organizations.isEmpty()) {
            builder.append(OrganizationFragment, String.join(",", this._organizations));
        }
        
        if (!StringUtils.isAllBlank(this._expiration)) {
            builder.append(ExpirationFragment, this._expiration);
        }
        
        if (!StringUtils.isAllBlank(this._clientId)) {
            builder.append(ClientIdFragment, this._clientId);
        }                   
        
        if (!builder.isEmpty()) {
            builder.deleteCharAt(builder.length()-1);
        }
        
        return builder.toString();
    }    
    
}