package com.jasperreports.custom.bikeshare;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import net.sf.jasperreports.engine.JRDefaultScriptlet;
import net.sf.jasperreports.engine.JRScriptletException;

public class TimeframeScriptlet extends JRDefaultScriptlet
{
	String _paramValue = "";	
	
	public void afterReportInit() throws JRScriptletException 
	{
		_paramValue = (String)this.getParameterValue("Timeframe");
	}
	
	// Returns exclusive start date	for a range
	public String getStartDateString(String format) throws JRScriptletException
	{
		LocalDate nowDate = LocalDate.now();
		LocalDate adjustedDate;
				
		switch (_paramValue)
		{
			case "current":
				adjustedDate = nowDate.minusDays(1);
				break;
				
			case "last24":
				adjustedDate = nowDate.minusDays(2);
				break;
				
			case "lastweek":
				adjustedDate = nowDate.minusWeeks(1);
				break;
				
			case "lastmonth":
				adjustedDate = nowDate.minusMonths(1);
				break;
				
			case "lastquarter":
				adjustedDate = nowDate.minusMonths(3);
				break;
				
			case "annual":
				adjustedDate = nowDate.minusYears(1);
				break;
				
			default:
				adjustedDate = nowDate.minusDays(1);
		}		
		
		return adjustedDate.format(DateTimeFormatter.ofPattern(format));
	}
	
	
	// returns exclusive end date for a range
	public String getEndDateString(String format) throws JRScriptletException
	{		
		LocalDate nowDate = LocalDate.now();		
		LocalDate adjustedDate;		

		switch (_paramValue)
		{
			case "current":
				adjustedDate = nowDate.plusDays(1);
				break;	
			default:
				adjustedDate = nowDate;
		}		
		
		return adjustedDate.format(DateTimeFormatter.ofPattern(format));
	}
	
	
}

