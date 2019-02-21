package customtokenauth.bikesharecipher;

import java.util.Random;

import com.jaspersoft.jasperserver.api.common.crypto.CipherI;
 
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest  extends TestCase
{
	CipherI sc = new BikeShareCipher("BikeShareSecret8");

    public AppTest( String testName )
    {
        super( testName );
    }

    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }
    
    private String decrypt(String text) {
    	String original = sc.decrypt(text); 
    	System.out.println("Decrypted: " + original);
    	return original;
    }
    
    private String encrypt(String text) {
    	String cipher = sc.encrypt(text); 
    	System.out.println("Encrypted: " + cipher);
    	return cipher;
    }

	public void testNotBlank() {
		String input = randomString(50);
		assertNotNull(input);
		
		String output = encrypt(input);
		assertNotNull(output);
		
		assertNotSame(output, "");
	}
	
	public void testReversible() {
		String input = randomString(50);
		assertNotNull(input);
		
		String output = encrypt(input);
		assertNotNull(output);
		String decrypt = decrypt(output);
		assertNotNull(decrypt);
		
		assertEquals(input, decrypt);
	}
	
	public void testChanged() {
		String input = randomString(50);
		assertNotNull(input);
		String output = encrypt(input);
		assertNotNull(output);
		assertNotSame(input, output);
	}
	
	
	private String randomString(int length) {
		int min = 65;
		int max = 90;
		
		StringBuilder sb = new StringBuilder();
		Random rand = new Random();
		
		for (int i = 0; i < length; i++) {
			char c;
			
			c = (char) (rand.nextInt((max - min) + 1) + min);
			
			sb.append(c);
		}

		System.out.println("generated: " + sb.toString());
		return sb.toString();
	}
}

