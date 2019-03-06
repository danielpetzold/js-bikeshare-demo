import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import customtokenauth.*;
import customtokenauth.bikesharecipher.BikeShareCipher;
import customtokenauth.bikesharecipher.Encryptor;
import com.jaspersoft.jasperserver.api.common.crypto.CipherI;

public class Generator {

	static  String encryptionKey = "BikeShareSecret8";
	
	public static void main(String[] args) {		
		CipherI cipher = new BikeShareCipher(encryptionKey);
		
		System.out.println("Building token...");
		System.out.println("");
		
		System.out.println("------Parsed Args------");
		TokenBuilder tBuilder = getTokenBuilder(args);
		System.out.println("");
		
		System.out.println("------Assigned Token Args-------");
		boolean isValid = tBuilder.isValid();
		System.out.println("username: " + tBuilder.getUserName());
		System.out.println("roles: " + tBuilder.getRoles().toString());
		System.out.println("orgs: " + tBuilder.getOrganizations().toString());
		System.out.println("orgs: " + tBuilder.getExpiration());
		System.out.println("Token is valid: " + isValid);
		System.out.println("");
		
		if (isValid)
		{
			System.out.println("Encrypting token...");
			System.out.println("");
			String builtToken = tBuilder.build();
			System.out.println("Built token: " + builtToken);
			String encryptedToken = cipher.encrypt(builtToken);
			System.out.println("Encrypted token: " + encryptedToken);
		}
	}	
	
	protected static TokenBuilder getTokenBuilder(String[] args)
	{
		TokenBuilder tokenBuilder = new TokenBuilder();
		
		Map<String, String> map = new HashMap<String,String>();
				
		for (String s: args) 
		{
			String[] kv = s.split(":");
			map.put(kv[0], kv[1]);
			System.out.println(map.get(kv[0]));		   
		}		
		
		
	    try {
	    	
			tokenBuilder
			      .setUserName(map.get("u"))
			      .setRoles(Arrays.asList(map.get("r").split(",")))
			      .setOrganizations(Arrays.asList(map.get("o").split(",")))
			      .setExpiration(new SimpleDateFormat("MM/dd/yyyy").parse(map.get("e")));
			
		} catch (ParseException e) {
			
			e.printStackTrace();
		}
	    
		
		return tokenBuilder;
	}

}



