/** File:  common-utilities.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2003 by Jesse M. Heines.  All rights reserved, but may be freely
 *    copied or extracted from for educational purposes with credit to the author.
 *  updated by JMH on October 19, 2005 at 11:57 AM
 *  updated by JMH on December 17, 2012 at 9:24 AM
 */


/** This function resizes the browser window to its maximum resizable size.
 *  Source:
 *    Auto Maximize Window Script- © Dynamic Drive (www.dynamicdrive.com)
 *    This notice must stay intact for use.
 *    Visit http://www.dynamicdrive.com/ for this script and 100's more.
 *    Note: Updated 12/04/00 to work in frames and NS6.
 *  This code was debugged with student David Peet on 2003-10-20.
 */
function maximizeWindow() {
  top.window.moveTo( 0, 0 ) ;

  var isIE = navigator.appVersion.indexOf( "MSIE", 0 ) != -1 ;

  if ( isIE ) {
    // handle Internet Explorer
    top.window.resizeTo( screen.availWidth, screen.availHeight ) ;

  } else if ( document.layers || document.getElementById ) {
    // handle Mozilla and Netscape
    if ( top.window.outerHeight < screen.availHeight ||
         top.window.outerWidth < screen.availWidth ) {
      top.window.outerHeight = screen.availHeight ;
      top.window.outerWidth = screen.availWidth ;
      top.window.moveTo( self.screenX, self.screenY ) ;
    }

  	var tmp1 = parent.outerWidth - parent.innerWidth;
  	var tmp2 = parent.outerHeight - parent.innerHeight;

  	newWidth -= tmp1;
  	newHeight -= tmp2;

  	top.window.screenX = 0 ;
  	top.window.screenY = 0 ;
  }
}



/** This function identifies the precise browser type and platform.  It was
 *  developed for the Poetry Explication project on 2003-11-05.
 *
 */
function idBrowser() {
  var strNavPlat = navigator.platform ;     // determine user's platform
  if ( strNavPlat == "Win32" ) {
    strNavPlat = "Windows" ;
  }

  var strNavName = navigator.appName ;      // determine user's browser name
  if ( strNavName == "Microsoft Internet Explorer" ) {
    strNavName = "Internet Explorer" ;
  }

  var strNavVer = navigator.userAgent ;     // determine user's browser version
  if ( strNavName == "Internet Explorer" ) {
    strNavVer = strNavVer.substring( strNavVer.indexOf( "MSIE" ) + 5 ) ;
    strNavVer = strNavVer.substring( 0, strNavVer.indexOf( ";" ) ) ;
  } else if ( strNavName == "Netscape" ) {
    strNavVer = strNavVer.substring( strNavVer.indexOf( "Netscape/" ) + 9 ) ;
    if ( strNavVer.indexOf( " " ) != -1 ) {
      strNavVer = strNavVer.substring( 0, strNavVer.indexOf( " " ) ) ;
    }
  }

  // tell user what s/he's running
  document.write( "<p>>>> You appear to be running under: <b>" + strNavPlat + " using " +
                  strNavName + " Version " + strNavVer + "</b>" ) ;
  document.write( "</p>" ) ;

  // say whether the user's system is OK
  if ( ( strNavPlat == "Windows" && strNavName == "Internet Explorer" && strNavVer >= "6.0" ) ||
       ( strNavPlat == "MacPPC" && strNavName == "Netscape" && strNavVer >= "7.1" ) ) {
    document.write( "<p>Your system appears to be compatible with this program. If you experience " +
                    "any problems, please notify Jesse Heines at " +
                    "<a href='mailto:heines@cs.uml.edu'>heines@cs.uml.edu</a>.  Thank you." ) ;
  } else {
    document.write( "<p style='color: red'>Your system does <b>NOT</b> appear to be compatible with this program. " +
                    "Please switch to a compatible system. This Web site will not work " +
                    "properly on the system you are using. Thank you." ) ;
  }
}


// This function rounds a number to the specified number of decimal places.
// by Jesse M. Heines, UMass Lowell Computer Science
//
// Parameters:
//    n     the number to round
//    nDec  the desired number of decimal places
//
function RoundTo( n, nDec ) {
  var Multiplier = Math.pow( 10, nDec ) ;   // we need 10 raised to the power of
                                            //   the desired number of decimal
                                            //   places

  return Math.round( Multiplier * n ) / Multiplier ;
    // to get the desired result, we multiply the number by the multiplier,
    //   round it, and then divide it by the multiplier
}


// This function rounds a number to the specified number of decimal places.
// It differs from RoundTo above by adding a decimal point and trailing zeros
//   if appropriate.
// by Jesse M. Heines, UMass Lowell Computer Science
//
// Parameters:
//    n     the number to round
//    nDec  the desired number of decimal places
//
function jRoundTo( n, nDec ) {
  var multiplier = Math.pow( 10, nDec ) ;
    // we need 10 raised to the power of the desired number of decimal places
  var result = Math.round( multiplier * n ) / multiplier ;
    // to get the desired result, we multiply the number by the multiplier,
    //   round it, and then divide it by the multiplier

  result = result + "" ;   // convert to a string

    // append decimal point and trailing zeros if appropriate
  if ( result.indexOf( "." ) == -1 ) {
    result = result + "." ;
  }
  while ( result.length - result.indexOf( "." ) <= nDec ) {
    result = result + "0" ;
  }

  return result ;
}


// This function formats a large number by adding commas.
// by Jesse M. Heines, UMass Lowell Computer Science
//
// Parameters:
//    n  number to format, can include a decimal part
//
function addCommas( n ) {
   // initializations
   var k ;                 // local loop index
   var strFracPart = "" ;  // fractional part of n (if any)
   var strN = "" + n ;     // convert n to a string
   var strResult = "" ;    // strResult string to return
   var nDecimalPoint = strN.indexOf( "." ) ;
                           // location of decimal point in input
                           //   number string or -1 if no decimal
                           //   point is present

   // separate the number's whole number and fraction parts
   //   if a decimal point is present
   if ( nDecimalPoint != -1 ) {
      strFracPart = strN.substr( nDecimalPoint, strN.length ) ;
      strN = strN.substr( 0, nDecimalPoint ) ;
   }

   // prepend a "0" if there is no whole number part
   if ( strN == "" ) {
     strN = "0" ;
   }

   // add commas
   for ( k = strN.length-3 ; k > 0 ; k-=3 ) {
      strResult = "," + strN.substr( k, 3 ) + strResult ;
   }

   // add the remaining digits and the fraction part (if any)
   return( strN.substr( 0, k+3 ) + strResult + strFracPart ) ;
}


/**
 *  Usage:  addCommas(12345678);
 *  result: 12,345,678
 *  by Darian Cabot
 *  found at http://www.queness.com/post/9806/5-missing-javascript-number-format-functions
 *  original post http://www.dariancabot.com/2011/02/02/useful-javascript-number-formatting-functions/
 *  that original post credits Keith Jenci at http://www.mredkj.com/javascript/nfbasic.html
 */

/**
 *  Formats a numeric string by adding commas for cosmetic purposes.
 *  @author Keith Jenci
 *  @see http://www.mredkj.com/javascript/nfbasic.html
 *  @param {String} nStr A number with or without decimals.
 *  @returns a nicely formatted number.
 *  @type String
 */

/**
 *  Additional documentation and formatting and variable name changes
 *  made by Jesse Heines on September 10, 2012 at 8:31 AM.
 */
function addCommas_regex( strNumber ) {
  strNumber += "" ;                       // ensures that argument strNumber is indeed a string
  var arrNumber = strNumber.split(".") ;  // splits strNumber on the decimal point
  var numericPart = arrNumber[0] ;        // the first array element is the numeric part of the number
  var decimalPart = arrNumber.length > 1 ? "." + arrNumber[1] : "" ;
      // the second array element is the decimal part of the number
      // this is the part of the number after the ".", or an empty string ("") if there is no decimal point

  var rgx = /(\d+)(\d{3})/ ;
      // this regular expression matches 1 or more decimal digits followd by a group of 3 decimal digits
      // \d matches any decimal digit
      // \d+ matches 1 or more decimal digits
      // \d{3} matches 3 decimal digits, which is the same as \d\d\d
      // the parentheses group the matches so that they can be referred to as $1 and $2 below
      // this regular expression will therefore match whenever there are at least 4 decimal digits in a row

  // repeat until the regular expression no longer matches
  while ( rgx.test( numericPart ) ) {
    numericPart = numericPart.replace( rgx, "$1" + "," + "$2" ) ;
      // $2 is the group of 3 decimal digits at the right of the matched expression
      // $1 is the group of 1 or more decimal digits to the left of the group of 3
      // this statement therefore concatenates the left group with a comma followed by the group of 3
  }

  // return the formatted numeric part concatenated to the original fractional part (which may be blank)
  return numericPart + decimalPart ;
}


// pad a string with leading zeros to a specified width
// by Jesse M. Heines, UMass Lowell Computer Science
//
// Parameters:
//    nstr  the number to add leading zeros to as a string
//    nDec  the desired final width of the number
//
function jLeadingZeroes( nstr, width ){
  nstr = nstr + "" ;
  while ( nstr.length < width ) {
    nstr = "0" + nstr ;
  }
  return nstr ;
}


// return the time in hh:mm:ss format as an AM or PM string
// by Jesse M. Heines, UMass Lowell Computer Science
//
function jGetAMPMTime() {
  var date = new Date() ;

  var ampm = " AM" ;
  if ( date.getHours() > 11 ) { ampm = " PM" ; }

  var strTime = date.getHours() % 12 ;
  if ( strTime == 0 ) { strTime = 12 ; }

  strTime += ":" + jLeadingZeroes( date.getMinutes(), 2 ) +
             ":" + jLeadingZeroes( date.getSeconds(), 2 ) + ampm ;
  return strTime ;
}


var arrMonth =  // names of all the months
      new Array( "January", "February", "March", "April", "May",
                 "June", "July", "August", "September", "October",
                 "November", "December" ) ;

var arrWeekday = // names of all the days of the week
      new Array( "Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday" ) ;


// return today's date in ISO8601 format
function GetTodayISO8601() {
  var now = new Date() ;

  var strNowISO8601 = "" + now.getFullYear() + "-" ;
  strNowISO8601 += ( now.getMonth()+1 < 10 ?
      "0" + (now.getMonth()+1) : now.getMonth()+1 ) ;
  strNowISO8601 += "-" + ( now.getDate() < 10 ?
      "0" + now.getDate() : now.getDate() ) ;

  return strNowISO8601 ;
}

// return "Month Day" given a date string in ISO8601 format
function MonthDay( strISO8601 ) {
  var strMonth = strISO8601.substr( 5, 2 ) ;
  while ( strMonth.substr( 0, 1 ) == "0" )
    strMonth = strMonth.substr( 1, strMonth.length ) ;
  var intMonth = parseInt( strMonth ) ;

  var strDay = strISO8601.substr( 8, 2 ) ;
  while ( strDay.substr( 0, 1 ) == "0" )  // parseInt does not like leading zeros
    strDay = strDay.substr( 1, strDay.length ) ;
  var intDay = parseInt( strDay ) ;

  return arrMonth[intMonth-1] + " " + intDay ;
}

// return "Month Day, Year" given a date string in ISO8601 format
function MonthDayYear( strISO8601 ) {
  return MonthDay( strISO8601 ) + ", " + strISO8601.substr( 0, 4 ) ;
}

// return a Date object given a date string in ISO8601 format
function DateISO8601( strISO8601 ) {
  var strYear = strISO8601.substr( 0, 4 ) ;
  while ( strYear.substr( 0, 1 ) == "0" )
    strYear = strYear.substr( 1, strYear.length ) ;
  var intYear = parseInt( strYear ) ;

  var strMonth = strISO8601.substr( 5, 2 ) ;
  while ( strMonth.substr( 0, 1 ) == "0" )  // parseInt does not like leading zeroes!
    strMonth = strMonth.substr( 1, strMonth.length ) ;
  var intMonth = parseInt( strMonth ) - 1;

  var strDay = strISO8601.substr( 8, 2 ) ;
  while ( strDay.substr( 0, 1 ) == "0" )    // parseInt does not like leading zeroes!
    strDay = strDay.substr( 1, strDay.length ) ;
  var intDay = parseInt( strDay ) ;

  return new Date( intYear, intMonth, intDay ) ;
}


// return "Weekday, Month Day, Year" given a date string in ISO8601 format
function WeekdayMonthDayYear( strISO8601 ) {
  var strDate = DateISO8601( strISO8601 ).toString() ;
  var strAbbr = strDate.substr( 0, 3 ) ;
  var k ;
  for ( k = 0 ; k < arrWeekday.length ; k++ )
    if ( arrWeekday[k].indexOf( strAbbr ) == 0 )
      break ;
  if ( k == arrWeekday.length ) k = 0 ;
  return arrWeekday[k] + ", " + MonthDayYear( strISO8601 ) ;
}


// To make a reload button
onClick="javascript:location.reload();"  // location is a DHMTL object

// To make a back button
onClick="javascript:history.back();"  // history is a DHMTL object

// To make a print button
onClick="javascript:window.print();"  // window is a DHMTL object

// To number the rows in the first column of a table (set align="right")
function numberRows( tblTableID, nFirstRow, nLastRow, nColumn) {
  for ( var nRow = nFirstRow ; nRow <= nLastRow ; nRow++ ) {
    tblTableID.rows(nRow).cells(nColumn).innerHTML =
         "&nbsp;" + (nRow-1) + "&nbsp;" ;
  }
}


// This function returns true if the string passed to it contains only
//   white space.  Otherwise, it returns false.
//
function iswhitespace( s ) {
  for ( var k = 0 ; k < s.length ; k++ ) {
    if ( ( s[k] != " " ) && ( s[k] != "\t" ) && ( s[k] != "\n" ) ) {
      return false ;
    }
  }
  return true ;
}
