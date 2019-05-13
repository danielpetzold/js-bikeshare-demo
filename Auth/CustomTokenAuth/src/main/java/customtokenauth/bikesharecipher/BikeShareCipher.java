package customtokenauth.bikesharecipher;

import com.jaspersoft.jasperserver.api.common.crypto.CipherI;


public class BikeShareCipher implements CipherI {
	
	private String _key = "BikeShareSecret8";
	
	public BikeShareCipher() {}	

	public BikeShareCipher(String key)
	{
		_key = key;		
	}
	
	public String encrypt(String plainText)  {
		
		return Encryptor.encrypt(_key, plainText);
	}

	public String decrypt(String cipherText) {
		return Encryptor.decrypt(_key, cipherText);
	}
	
}
