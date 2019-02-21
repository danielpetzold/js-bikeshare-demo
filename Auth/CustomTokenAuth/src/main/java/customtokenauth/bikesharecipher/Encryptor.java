package customtokenauth.bikesharecipher;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Encryptor {
	public static boolean ivB64Encoded = true;
    public static String encrypt(String key, String value) {
        try {
        	String IV = randomString(16);
            IvParameterSpec iv = new IvParameterSpec(IV.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

            byte[] encrypted = cipher.doFinal(value.getBytes());
            String encryptedMessage = Base64.getEncoder().encodeToString(encrypted);
            
            if (ivB64Encoded) 
            	return Base64.getEncoder().encodeToString(IV.getBytes()) + encryptedMessage;
            else 
            	return IV + encryptedMessage;
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public static String decrypt(String key, String encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(getIvFrom(encrypted));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
            byte[] decoded = Base64.getDecoder().decode(getEncryptedFrom(encrypted));
            
            byte[] original = cipher.doFinal(decoded);
            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }
    
    private static byte[] getIvFrom(String input) {
    	if (ivB64Encoded) 
    		return Base64.getDecoder().decode(input.substring(0, 24));
		else
			try {
				return input.substring(0, 16).getBytes("UTF-8");
			} catch (UnsupportedEncodingException e) {				
				e.printStackTrace();
			}
    	return null;
    }
    
    private static String getEncryptedFrom(String input) {
    	if (ivB64Encoded) 
    		return input.substring(24);
    	else
    		return input.substring(16);
    }
    
    public static String b64encode(String input) {
    	return Base64.getEncoder().encodeToString(input.getBytes());
    }
    
	private static String randomString(int length) {
		int min = 48;
		int max = 122;
		
		StringBuilder sb = new StringBuilder();
		Random rand = new SecureRandom();
		
		for (int i = 0; i < length; i++) {
			char c;
			
			c = (char) (rand.nextInt((max - min) + 1) + min);
			
			sb.append(c);
		}

		return sb.toString();
	}
}
