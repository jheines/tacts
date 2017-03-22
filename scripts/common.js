/** File:  /~heines/common.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2004 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on January 31, 2014 at 10:14 PM
 *  updated by JMH on October 10, 2014 at 5:23 PM to add spacing to "no longer available" message
 *  updated by JMH on December 16, 2014 at 2:17 PM to switch to teaching.cs.uml.edu if accessing 
 *    abraham.cs.uml.edu from other than a localhost (127.0.0.1)
 *  updated by JMH on February 3, 2015 at 1:48 PM to change getYear() to getFullYear()
 *    and added function DateObjectToWeekdayMonthDayYearAtTime( dateObj )
 *  updated by JMH on July 7, 2015 at 9:43 AM to correct printing time zone on Safari
 *  updated by JMH on September 4, 2015 at 12:29 PM to add support for localhost:8080
 *  updated by JMH on October 21, 2015 at 12:19 PM to add target="_self" to GoToCourse
 *
 *  N.B. Firefox does not support the innerText property.  See:
 *      http://www.quirksmode.org/dom/w3c_html.html
 */
 
 

/****

=== vs. ==

The following information is from:
  http://stackoverflow.com/questions/359494/javascript-vs-does-it-matter-which-equal-operator-i-use

The identity (===) operator behaves identically to the equality (==) 
operator except no type conversion is done, and the types must be the 
same to be considered equal.

Reference: Javascript Tutorial: Comparison Operators

  The == operator will compare for equality after doing any necessary 
  type conversions.  The === operator will not do the conversion, so if 
  two values are not the same type === will simply return false.  It's 
  this case where === will be faster, and may return a different result 
  than ==. In all other cases performance will be the same.

To quote Douglas Crockford's excellent JavaScript: The Good Parts,

  JavaScript has two sets of equality operators: === and !==, and their 
  evil twins == and !=.  The good ones work the way you would expect. 
  If the two operands are of the same type and have the same value, then 
  === produces true and !== produces false.  The evil twins do the right 
  thing when the operands are of the same type, but if they are of 
  different types, they attempt to coerce the values.  The rules by 
  which they do that are complicated and unmemorable.

  These are some of the interesting cases:

    '' == '0'           // false
    0 == ''             // true
    0 == '0'            // true
    
    false == 'false'    // false
    false == '0'        // true
    
    false == undefined  // false
    false == null       // false
    null == undefined   // true
    
    ' \t\r\n ' == 0     // true
  
  The lack of transitivity is alarming.  My advice is to never use the 
  evil twins.  Instead, always use === and !==.  All of the comparisons 
  just shown produce false with the === operator.
  
For reference types == and === act consistently with one another (except 
in a special case).

  The special case is when you compare a string literal with a string 
  object created with the String constructor.
  
    "abc" == new String("abc")    // true
    "abc" === new String("abc")   // false
  
  Here the == operator is checking the values of the two objects and 
  returning true, but the === is seeing that they're not the same type 
  and returning false. Which one is correct? That really depends on what 
  you're trying to compare. My advice is to bypass the question entirely 
  and just don't use the String constructor to create string objects.

****/ 

var jmhDebug = false ;   // set to true to display debugging information
var bShowSecondaryEmailAddresses = false ;  // set to true to show second and third email addresses

// global constants
var strProf = "Prof. Jesse M. Heines" ;   // professor's name

// the following declaration was updated by JMH on September 6, 2010 at 11:14 AM
// to reflect newer programming style
// var arrMonth =  // names of all the months
//       new Array( "January", "February", "March", "April", "May", "June",
//                  "July", "August", "September", "October", "November", "December" ) ;

var arrMonth =  // names of all the months
      [ "January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December" ] ;

// the following declaration was updated by JMH on September 6, 2010 at 11:14 AM
// to reflect newer programming style
// var arrWeekday =  // names of all the days of the week
//       new Array( "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ) ;

var arrWeekday =  // names of all the days of the week
      [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ] ;

// supported top level domain names
// captured from http://www.webdigity.com/ws/ on September 26, 2009 at 9:47 PM
var arrDomains = [ "com", "net", "org", "edu", "name", "biz", "info", "nl", "be", "de", "fr", "eu",
      "us", "uk", "co.uk", "org.uk", "sch.uk", "gov.uk", "edu.gr", "org.gr", "com.gr", "net.gr",
      "gr", "am", "ie", "tv", "fm", "tk", "br", "ca", "cn", "gov", "pl", "ru", "kr", "is", "nu",
      "jp", "pt", "se", "nz", "no", "it", "ws", "dk", "lv", "ro", "to", "st", "ch", "cz", "tw",
      "bg", "at", "cc", "tc", "mn", "il", "sg", "hu", "lt", "je", "ee", "cl", "tr", "th", "ae",
      "sk", "in", "cx", "ir", "hk", "com.au", "ac", "ac.cn", "ac.jp", "ac.uk", "ad.jp", "adm.br",
      "adv.br", "aero", "ag", "agr.br", "ah.cn", "al", "am.br", "arq.br", "art.br", "as", "asn.au",
      "ato.br", "au", "av.tr", "az", "ba", "bel.tr", "bio.br", "biz.tr", "bj.cn", "bmd.br", "by",
      "cd", "cim.br", "ck", "cng.br", "cnt.br", "co.at", "co.jp", "com.br", "com.cn", "com.eg",
      "com.hk", "com.mx", "com.ru", "com.tr", "com.tw", "conf.au", "cq.cn", "csiro.au", "cy",
      "dr.tr", "dz", "ecn.br", "edu.au", "edu.br", "edu.tr", "eg", "emu.id.au", "eng.br", "es",
      "esp.br", "etc.br", "eti.br", "eun.eg", "far.br", "fi", "fj", "fj.cn", "fm.br", "fnd.br",
      "fo", "fot.br", "fst.br", "g12.br", "gb", "gb.com", "gb.net", "gd.cn", "ge", "gen.tr",
      "ggf.br", "gl", "gob.mx", "gov.au", "gov.br", "gov.cn", "gov.hk", "gov.tr", "gr.jp", "gs",
      "gs.cn", "gx.cn", "gz.cn", "ha.cn", "hb.cn", "he.cn", "hi.cn", "hk.cn", "hl.cn", "hm",
      "hn.cn", "id.au", "idv.tw", "imb.br", "ind.br", "inf.br", "info.au", "info.tr", "int",
      "jl.cn", "jor.br", "js.cn", "jx.cn", "k12.tr", "ke", "la", "lel.br", "li", "lk", "ln.cn",
      "ltd.uk", "lu", "ma", "mat.br", "mc", "md", "me.uk", "med.br", "mil", "mil.br", "mil.tr",
      "mk", "mo.cn", "ms", "mt", "mus.br", "mx", "name.tr", "ne.jp", "net.au", "net.br", "net.cn",
      "net.eg", "net.hk", "net.lu", "net.mx", "net.ru", "net.tr", "net.tw", "net.uk", "nm.cn",
      "no.com", "nom.br", "not.br", "ntr.br", "nx.cn", "odo.br", "oop.br", "or.at", "or.jp",
      "org.au", "org.br", "org.cn", "org.hk", "org.lu", "org.ru", "org.tr", "org.tw", "pk",
      "plc.uk", "pol.tr", "pp.ru", "ppg.br", "pro.br", "psc.br", "psi.br", "qh.cn", "qsl.br",
      "rec.br", "sc.cn", "sd.cn", "se.com", "se.net", "sh", "sh.cn", "si", "slg.br", "sm", "sn.cn",
      "srv.br", "su", "sx.cn", "tel.tr", "tj.cn", "tm", "tmp.br", "tn", "trd.br", "tur.br", "tv.br",
      "tw.cn", "ua", "uk.com", "uk.net", "va", "vet.br", "vg", "wattle.id.au", "web.tr", "xj.cn",
      "xz.cn", "yn.cn", "yu", "za", "zj.cn", "zlg.br", "bz" ] ;


// As of September 13, 2013 the endsWith function was implemented in 
//    Firefox but not in Chrome.
// The following code adds the endsWith function to all strings per
//    http://stackoverflow.com/questions/280634/endswith-in-javascript
// This function was developed with help of student Evan Mulawski.
// added by JMH on September 13, 2013 at 9:21 AM
String.prototype.endsWith = function( suffix ) {
  return new RegExp( suffix + "$" ).test( this ) ;
}
String.prototype.startsWith = function( prefix ) {
  return new RegExp( "^" + prefix ).test( this ) ;
}

var ACTIVITY = true ;                   // for setting Activity page type from HTML files
var HOMEPAGE = true ;                   // for showing the Home Page button from HTML files
var bConstShowFavoritesButton = true ;  // for showing the Add to Favorites button in HTML files
var bConstShowHomePageButton = true ;   // for showing the Home Page button in HTML files
var bConstShowFramesButton = true ;     // for showing the Frame/Unframe buttons in HTML files
var bConstShowFontSizeButton = true ;   // for showing the Font Size button in HTML files
var bConstSetFontImages = true ;        // for setting the font size images at the time that the
                                        //    page manipulation buttons are displayed
var bConstPrinterFriendlyVersionAvailable = true ;
                                        // for reloading the printer friendly version of a page
var bConstAddBorder = true ;            // for adding a border to images displayed by ShowImage

// global variables
var pos ;           // location of search string within a string
var intDotPos ;     // location of "." within a string
var intSlashPos ;   // location of "/" within a string

var strLoc = "" ;              // document location as a string
var strFile = "" ;             // file name part of document location
var strSiteHome = "" ;         // URL of Web site home
var strBaseSupportLoc = "" ;   // URL of .js and .css base support files
var strImagesLoc = "" ;        // URL of main images subdirectory
var strCourseHome = "" ;       // URL of course home directory
var strCourseDirectory = "" ;  // name of course subdirectory
var strCourseID = "" ;         // last part of course subdirectory, 91.nnn-YYYY-YYx
var strCourseSyllabus = "" ;   // file name of the course syllabus
var strCourseNo = "" ;         // course number including 91. prefix
var strCoCourseNo = "" ;       // course co-number including prefix
var strShortCourseNo = "" ;    // course number excluding 91. prefix
var strCourseSemesterLetter ;  // letter indicating the semester ('s' for Spring, 'f' for Fall)
var strCourseCalendarYear ;    // 4-digit year in which course is being taught
// var strCourseTitle = "" ;      // course title -- obsolete -- now read from XML file
var bFramed = ( window.parent.location != window.location ) ;
                               // true if frames are currently being displayed

// set URL of Web site home (without "index.htm")
strLoc = "" + document.location ;
// note that parentheses are required for ( pos+("~heines".length)+1 ) to generate a numeric result
// without the parentheses the numbers are concatenated as strings, although I don't know why  8-(
if ( ( pos = strLoc.indexOf( "~heines" ) ) != -1 ) {
  strSiteHome = strLoc.substring( 0, ( pos+("~heines".length)+1 ) ) ;
}
if ( ( pos = strLoc.indexOf( "%7Eheines" ) ) != -1 ) {
  strSiteHome = strLoc.substring( 0, ( pos+("%7Eheines".length)+1 ) ) ;
}
if ( ( pos = strLoc.indexOf( "%7eheines" ) ) != -1 ) {
  strSiteHome = strLoc.substring( 0, ( pos+("%7eheines".length)+1 ) ) ;
} else if ( ( pos = strLoc.indexOf( "public_html" ) ) != -1 ) {
  strSiteHome = strLoc.substring( 0, ( pos+("public_html".length)+1 ) ) ;
}

if ( strSiteHome == "" ) {
  strSiteHome = location.pathname.substring( 0, location.pathname.lastIndexOf( "/" ) + 1 ) ;
}

// set URL of main site images subdirectory
strImagesLoc = strSiteHome + "images/" ;

// relative URL of base support files
strBaseSupportLoc = "" ;
if ( strSiteHome.indexOf( "/evaluations" ) == 0 ) {
  strBaseSupportLoc = "base-support/" ;
}

// set URL of course home page
pos = strLoc.indexOf( "/", strSiteHome.length ) ; // gets to first level course directory
pos = strLoc.indexOf( "/", pos + 1 ) ;            // gets to second level semester directory
strCourseHome = strLoc.substring( 0, pos+1 ) ;    // full path to course home directory

// alert( "strLoc = " + strLoc + "\n" +
//        strLoc.substr( strSiteHome.length + 1 ) + "\n" +
//        strSiteHome + " " + pos + "\n" +
//        strCourseHome ) ;

// extract the course directory name and ID
strCourseDirectory = strCourseHome.substring( strSiteHome.length,
                                              strCourseHome.length-1 ) ;
strCourseID = strCourseDirectory.substring( strCourseDirectory.indexOf( "/" ) + 1 ) ;


// extract the name of the file being displayed
intSlashPos = strLoc.lastIndexOf( "/" ) ;
strFile = strLoc.substr( intSlashPos+1, strLoc.length ) ;
                              // file name extracted from location string

// extract the Course Number
intSlashPos = (strCourseHome.substr( 0, strCourseHome.length-1 )).lastIndexOf( "/" ) ;
strCourseNo = strLoc.substr( intSlashPos+1, strCourseHome.length-1 ) ;
var intHyphenPos = strCourseNo.indexOf( "-" ) ;
if ( intHyphenPos > -1 ) {
  strCourseNo = strCourseNo.substr( 0, intHyphenPos ) ;
}
intSlashPos = strCourseNo.indexOf( "/" ) ;
if ( intSlashPos > -1 ) {
  strCourseNo = strCourseNo.substr( 0, intSlashPos ) ;
}

// alert( strLoc + "\n" +
//        strSiteHome + "\n" +
//        strCourseHome + " " + strCourseHome.length + "\n" +
//        strCourseHome.substr( 0, strCourseHome.length-1 ) + "\n" +
//        strCourseNo ) ;

// extract the short version of the Course Number
intDotPos = strCourseNo.lastIndexOf( "." ) ;
strShortCourseNo = strCourseNo.substr( intDotPos+1, strCourseNo.length ) ;

// extract the letter indicating the semester (s for Spring or f for Fall)
strCourseSemesterLetter = strCourseHome.substr( strCourseHome.length - 2, 1 ) ;

// extract the course calendar year
// strCourseID format: 91.462-2007-08s
if ( strCourseSemesterLetter == "f" ) {
  strCourseCalendarYear = strCourseID.substr( 7, 4 ) ;
} else {
  strCourseCalendarYear = strCourseID.substr( 7, 2 ) + strCourseID.substr( 12, 2 ) ;
}

// alert( strCourseHome + "\n" +
//        strCourseNo + "\n" +
//        strShortCourseNo + "\n" +
//        strCourseSemesterLetter ) ;


// set the Course Title
if ( typeof( strCourseTitle ) == "undefined" || strCourseTitle == "" ) {
  for ( var k = 0 ; k == 0 ; k++ ) {  // to satisfy the Dreamweaver debugger, which thinks that
                                  // break statements not within loops must name a label
    switch ( strCourseNo ) {
      case "201" : case "91.201" : strCourseTitle = "Computing III" ; break ;
      case "212" : case "91.212" : strCourseTitle = "Sound Thinking" ; break ;
      case "353" : case "91.353" : strCourseTitle = "GUI Programming I" ; break ;
      case "461" : case "91.461" :
        var strCourseTitle = "GUI Programming II" ;
        if ( strCourseID.substring( 12 ) >= "04f" ) {
          strCourseTitle = "GUI Programming I" ;
        }
        break ;
      case "462" : case "91.462" : strCourseTitle = "GUI Programming II" ; break ;
      case "513" : case "91.513" : strCourseTitle = "Internet &amp; Web Systems I" ; break ;
      case "514" : case "91.514" : strCourseTitle = "Internet &amp; Web Systems II" ; break ;
      default : strCourseTitle = "Invalid Course Number" ;
    }
  }
}


// set the course syllabus file name
strCourseSyllabus = strShortCourseNo + "sy" ;
if ( strCourseID.substr( strCourseID.length-1 ) == "f" ) {
  strCourseSyllabus += strCourseID.substr( 9, 2 ) + "f" ;
} else if ( strCourseID.substr( strCourseID.length-1 ) == "s" ) {
  strCourseSyllabus += strCourseID.substr( 12 ) ;
}
// alert( strCourseSyllabus + "\n" + strCourseID ) ;


// initialize the base point size to control selection of the CSS file to use
var strBasePointSize = "8" ;    // note that this is a string!
var bCookiesDisabled = false ;  // true if cookies are disabled

if ( typeof( GetCookie ) != "undefined" ) {
  // note that this code requires that cookies.js be loaded and is therefore
  //   enclosed in a typeof test
  strBasePointSize = GetCookie( "JMHstrBasePointSize" ) ;
  if ( strBasePointSize == null ) {
    strBasePointSize = 8 ;
    SetCookie( "JMHstrBasePointSize", strBasePointSize, null, "/" ) ;
  }
}


/** This function returns the browser name as read from the user agent string.
 *  Note that the order in which specific browser names are searched for is
 *    critical, as some appear in multiple UASs.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Updated: by JMH on December 3, 2004 at 12:46 PM
 *           by JMH on April 24, 2010 at 9:40 AM
 *  Parameters:
 *     none
 *  Return Value:
 *     string containing the browser name
 *
 *  navigator.userAgent strings as of July 7, 2015 at 9:52 AM
 *  Chrome
 *    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36"
 *    Note that this user agent string contains "Safari"!
 *  Firefox
 *    "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:39.0) Gecko/20100101 Firefox/39.0"
 *  Internet Explorer
 *    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; Tablet PC 2.0; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; InfoPath.3; rv:11.0) like Gecko"
 *  Safari on iPad
 *    "Mozilla/5.0 (iPad; CPU OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4"
 *  Safari on iPhone 5
 *    "Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4"
 *  Safari on Windows
 *    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"
 */
function getNavigatorUserAgentName()
{
  var strUserAgent = navigator.userAgent ;   // navigator's user agent string

  if ( strUserAgent.indexOf( "Netscape" ) !== -1 ) {
    return "Netscape Navigator" ;
  // } else if ( strUserAgent.indexOf( "MSIE" ) !== -1 ) {
  //   if ( strUserAgent.indexOf( "x64" ) !== -1 ) {
  //     return "Microsoft Internet Explorer (64-bit edition)" ;
  //   } else {
  //     return "Microsoft Internet Explorer (32-bit edition)" ;
  //   }
  } else if ( strUserAgent.indexOf( ".NET" ) !== -1 ) {
    return "Microsoft Internet Explorer" ;
  } else if ( strUserAgent.indexOf( "Chrome" ) !== -1 ) {  // must check for this first
    return "Google Chrome" ;
  } else if ( strUserAgent.indexOf( "Safari" ) !== -1 ) {
    return "Apple Safari" ;
  } else if ( strUserAgent.indexOf( "Konqueror" ) !== -1 ) {
    return "Konqueror" ;
  } else if ( strUserAgent.indexOf( "Firefox" ) !== -1 ) {
    return "Mozilla Firefox" ;
  } else if ( strUserAgent.indexOf( "Mozilla" ) !== -1 ) {
    return "Mozilla" ;
  } else if ( strUserAgent.indexOf( "Gecko" ) !== -1 ) {
    return "Mozilla" ;
  } else if ( strUserAgent.indexOf( "Opera" ) !== -1 ) {
    return "Opera" ;
  } else {
    return "an unrecognized browser" ;
  }
}


/** This function returns the navigator platform as read from the user agent
 *  string.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Updated: by JMH on December 3, 2004 at 12:46 PM
 *  Updated: by JMH on October 24, 2010 at 4:06 PM
 *  Parameters:
 *     none
 *  Return Value:
 *     string containing the browser platform
 */
function getNavigatorUserAgentPlatform() {
  var strUserAgent = navigator.userAgent ;   // navigator's user agent string

  if ( strUserAgent.indexOf( "Windows" ) !== -1 ) {
    return "Windows" ;
  } else if ( strUserAgent.indexOf( "Mac" ) !== -1 ) {
    return "Macintosh" ;
  } else if ( strUserAgent.indexOf( "Linux" ) !== -1 ) {
    return "Linux" ;
  } else if ( strUserAgent.indexOf( "Unix" ) !== -1 ) {
    return "Unix" ;
  } else if ( strUserAgent.indexOf( "iPod" ) !== -1 ) {
    return "iPod" ;
  } else if ( strUserAgent.indexOf( "iPad" ) !== -1 ) {
    return "iPad" ;
  } else if ( strUserAgent.indexOf( "iPhone" ) !== -1 ) {
    return "iPhone" ;
  } else {
    return "unrecognized" ;
  }
}


/** This function returns the browser version number read from the user agent
 *  string.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Updated: by JMH on April 5, 2009 at 2:36 PM
 *  Parameters:
 *     none
 *  Return Value:
 *     string containing the version number
 */
function getNavigatorUserAgentVersion()
{
  // determine user's browser name from user agent string
  var strNavName = getNavigatorUserAgentName() ;
  var strNavVersion = "undetermined" ;            // navigator's version number
  var strUserAgent = navigator.userAgent ;        // navigator's user agent string

  // extract version number from user agent
  if ( strNavName == "Microsoft Internet Explorer (32-bit edition)" ||
       strNavName == "Microsoft Internet Explorer (64-bit edition)" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "MSIE" ) + 5 ) ;
    strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( ";" ) ) ;
  } else if ( strNavName == "Google Chrome" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Chrome/" ) + 7 ) ;
    if ( strNavVersion.indexOf( " " ) != -1 )
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( " " ) ) ;
  } else if ( strNavName == "Netscape Navigator" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Netscape/" ) + 9 ) ;
    if ( strNavVersion.indexOf( " " ) != -1 )
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( " " ) ) ;
  } else if ( strNavName == "Apple Safari" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Safari/" ) + 7 ) ;
    if ( strNavVersion.indexOf( " " ) != -1 )
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( " " ) ) ;
  } else if ( strNavName == "Mozilla Firefox" || strNavName == "Firefox" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Firefox/" ) + 8 ) ;
    if ( strNavVersion.indexOf( " " ) != -1 )
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( " " ) ) ;
  } else if ( strNavName == "Opera" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Opera/" ) + 6 ) ;
    if ( strNavVersion.indexOf( " " ) != -1 )
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( " " ) ) ;
  } else if ( strNavName == "Mozilla" ) {
    strNavVersion = "undetermined" ;
    if ( strUserAgent.indexOf( "rv:" ) != -1 ) {
      strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "rv:" ) + 3 ) ;
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( ")" ) ) ;
    }
  } else if ( strNavName == "Konqueror" ) {
    strNavVersion = strUserAgent.substring( strUserAgent.indexOf( "Konqueror/" ) + 10 ) ;
    if ( strNavVersion.indexOf( ";" ) != -1 ) {
      strNavVersion = strNavVersion.substring( 0, strNavVersion.indexOf( ";" ) ) ;
    }
  } else {
    strNavVersion = "undetermined" ;
  }

  return strNavVersion ;
}


/** set global browser info variables for reference convenience */

var strNavName = getNavigatorUserAgentName() ;          // browser name read from the user agent string
var strNavVersion = getNavigatorUserAgentVersion() ;    // browser version number read from the user agent string
var strNavPlatform = getNavigatorUserAgentPlatform() ;  // browser platform read from the user agent string

var isChrome = ( strNavName === "Google Chrome" ) ;                         // running Google Chrome
var isFirefox = ( strNavName.indexOf( "Firefox" ) !== -1 ) ;                // running Mozilla Firefox
var isIE = ( strNavName.indexOf( "Microsoft Internet Explorer" ) === 0 ) ;  // running Internet Explorer
var isKonqueror = ( strNavName === "Konqueror" ) ;                          // running Konqueror
var isMozilla = ( strNavName === "Mozilla" ) ;                              // running Mozilla
var isNS = ( strNavName === "Netscape Navigator" ) ;                        // running Netscape
var isOpera = ( strNavName === "Opera" ) ;                                  // running Opera
var isSafari = ( strNavName === "Apple Safari" ) ;                          // running Safari
var isUnrecognized = ( strNavName === "an unrecognized browser" ) ;         // browser not recognized

var isWindows = ( strNavPlatform === "Windows" ) ;  // running on Windows
var isMac = ( strNavPlatform === "Mac" ) ;          // running on Macintosh
var isLinux = ( strNavPlatform === "Linux" ) ;      // running on Linux
var isUnix = ( strNavPlatform === "Unix" ) ;        // running on Unix
var isiPod = ( strNavPlatform === "iPod" ) ;        // running on iPod


// set the initial stylesheet for a normal page in a <head> section
// note that this function requires that cookies.js be loaded
function setStylesheet() {
  // exit if cookies.js has not been loaded
  if ( typeof( GetCookie ) === "undefined" ) {
    bCookiesDisabled = true ;
    return ;
  }

  if ( GetCookie( "JMHstrBasePointSize" ) === null || GetCookie( "JMHstrBasePointSize" ) === "10" ) {
    document.writeln( '<link rel="stylesheet" type="text/css" href="' + strSiteHome + strBaseSupportLoc + 'blueverdana.css" />' ) ;
  } else if ( GetCookie( "JMHstrBasePointSize" ) == "8" ) {
    document.writeln( '<link rel="stylesheet" type="text/css" href="' + strSiteHome + strBaseSupportLoc + 'blueverdana08pt.css" />' ) ;
  }
  bCookiesDisabled = ( GetCookie( "JMHstrBasePointSize" ) === null ) ;
}


// set the initial stylesheet in a <head> section
// note that this function requires that cookies.js be loaded
function setToolbarStylesheet() {
  // exit if cookies.js has not been loaded
  if ( typeof( GetCookie ) == "undefined" ) return ;

  if ( GetCookie( "JMHstrBasePointSize" ) == null || GetCookie( "JMHstrBasePointSize" ) == "10" ) {
    document.writeln( '<link rel="stylesheet" type="text/css" href="' + strSiteHome + strBaseSupportLoc + 'blueverdanatoolbar10pt.css" />' ) ;
  } else if ( GetCookie( "JMHstrBasePointSize" ) == "8" ) {
    document.writeln( '<link rel="stylesheet" type="text/css" href="' + strSiteHome + strBaseSupportLoc + 'blueverdanatoolbar08pt.css" />' ) ;
  }
}


// switch the document stylesheet
// note that this function requires that cookies.js be loaded
function switchStyleSheets( bReload ) {
  // test whether cookies are enabled
  // bCookiesDisabled = ( GetCookie( "JMHstrBasePointSize" ) == null ) ;
  if ( ! CookiesEnabled() ) {
    alert( "The font size cannot be changed on your system\n" +
           "because you have cookies disabled." ) ;
    return ;
  }

  // exit if cookies.js has not been loaded
  if ( typeof( GetCookie ) == "undefined" ) return ;

  // set default
  if ( typeof( bReload ) == "undefined" ) bReload = false ;

  if ( strBasePointSize == 8 && document.all ) {      // Internet Explorer
    strBasePointSize = 10 ;
    SetCookie( "JMHstrBasePointSize", strBasePointSize, null, "/" ) ;
    document.createStyleSheet( strSiteHome + strBaseSupportLoc + "blueverdana.css" ) ;
    if ( bReload ) window.location.reload( true ) ;
  } else if ( strBasePointSize == 8 ) {              // Netscape
    // document.createStyleSheet( strSiteHome + "blueverdana.css" ) ;
    // document.writeln( "<link rel=\"stylesheet\" type=\"text/css\" href=\"blueverdana.css\">" ) ;
    strBasePointSize = 10 ;
    SetCookie( "JMHstrBasePointSize", strBasePointSize, null, "/" ) ;
    window.location.reload( true ) ;
  } else if ( strBasePointSize == 10 && document.all ) {  // Internet Explorer
    strBasePointSize = 8 ;
    SetCookie( "JMHstrBasePointSize", strBasePointSize, null, "/" ) ;
    document.createStyleSheet( strSiteHome + strBaseSupportLoc + "blueverdana08pt.css" ) ;
    if ( bReload ) window.location.reload( true ) ;
  } else {                                               // Netscape
    // document.createStyleSheet( strSiteHome + "blueverdana08pt.css" ) ;
    // document.writeln( "<link rel=\"stylesheet\" type=\"text/css\" href=\"blueverdana08pt.css\">" ) ;
    strBasePointSize = 8 ;
    SetCookie( "JMHstrBasePointSize", strBasePointSize, null, "/" ) ;
    window.location.reload( true ) ;
  }

  showFontSizeButtonImages() ;
  updateToolbar() ;
}


// set icon on mousedown event for switching fonts
function setFontMouseDown( objImg ) {
  showFontSizeButtonImages() ;

  // if ( strBasePointSize == 10 ) {
  //   objImg.src = strImagesLoc + "fonticonsmall_down.gif" ;
  //   objImg.alt = "Decrease Font Size" ;
  // } else if ( strBasePointSize == 8 ) {
  //   objImg.src = strImagesLoc + "fonticonbig_down.gif" ;
  //   objImg.alt = "Increase Font Size" ;
  // }
}


// set icon on mouseout event for switching fonts
function setFontMouseOut( objImg ) {
  showFontSizeButtonImages() ;

  // if ( strBasePointSize == 10 ) {
  //   objImg.src = strImagesLoc + "fonticonsmall.gif" ;
  //   objImg.alt = "Decrease Font Size" ;
  // } else if ( strBasePointSize == 8 ) {
  //   objImg.src = strImagesLoc + "fonticonbig.gif" ;
  //   objImg.alt = "Increase Font Size" ;
  // }
}


// trim leading and trailing spaces
// by Jesse M. Heines, heines@cs.uml.edu
function trim( str ) {
  // remove white space characters at the beginning of the string
  while ( str.length > 0 &&
          ( str.charAt( 0 ) == " " ||
            str.charAt( 0 ) == "\n" ||
            str.charAt( 0 ) == "\t" ) ) {
    str = str.substr( 1 ) ;
  }
  // remove white space characters at the end of the string
  while ( str.length > 0 &&
          ( str.charAt( str.length-1 ) == " "  ||
            str.charAt( str.length-1 ) == "\n" ||
            str.charAt( str.length-1 ) == "\t" ) ) {
    str = str.substr( 0, str.length-1 ) ;
  }
  // return the modified string
  return str ;
}


// show window with no frames
function removeFrames() {
  // alert( top.frames.length ) ;
  if ( bFramed ) {
    window.top.location.replace( window.location ) ;
  } else {
    alert( "You are currently viewing this page without frames.\n\n" +
           "Click the Restore Frames button to see it with frames." ) ;
  }
}


// show window with no frames
function restoreFrames() {
  var strToolbar = strCourseHome + strShortCourseNo ;

  // alert( strCourseHome + "\n" + strShortCourseNo + "\n" + strToolbar ) ;

  if ( typeof( strToolbar ) == "undefined" ||
       strToolbar == "" || strShortCourseNo == "htm" ||
       strShortCourseNo.indexOf( "academic" ) != -1 ||
       strToolbar.indexOf( "academic" ) != -1 )
    strToolbar = strSiteHome + "jessehome" ;

  // alert( typeof( strToolbar ) + "\n" + strSiteHome + "\n" + strToolbar ) ;

  if ( bFramed ) {
    alert( "You are currently viewing this page with frames.\n\n" +
           "Click the Remove Frames button to see it without frames." ) ;
  } else {
    document.close() ;

    document.open() ;
    document.writeln( '<html>' ) ;
    document.writeln( '<head>' ) ;
    document.writeln( '  <script type="text/javascript">' ) ;
    document.writeln( '    var strMain = window.location ;' ) ;
    document.writeln( '    function loadMain() {' ) ;
    document.writeln( '      parent.frames[\'Main\'].location = window.location ;' ) ;
    document.writeln( '    }' ) ;
    document.writeln( '  </script>' ) ;
    document.writeln( '</head>' ) ;

    document.writeln( '<frameset rows="*" cols="155,*" border="0" onload="loadMain();">' ) ;
    document.writeln( '  <frameset rows="110,*" cols="*" border="0">' ) ;
    document.writeln( '    <frame name="UMLlogo" noresize scrolling="no" src="' + strSiteHome + 'umllogo.htm">' ) ;
    // document.writeln( '    <frame name="Toolbar" noresize scrolling="auto" src="' + strToolbar + 'toolbar.htm">' ) ;
    // document.writeln( '    <frame name="Toolbar" noresize scrolling="auto" src="about:blank">' ) ;
    document.writeln( '    <frame name="Toolbar" noresize scrolling="auto" src="' + strSiteHome + 'bluebackground.htm">' ) ;
    document.writeln( '  </frameset>' ) ;
    document.writeln( '  <frameset rows="50,*" cols="*" border="0">' ) ;
    document.writeln( '    <frame name="Titlebar" noresize scrolling="no" src="' + strSiteHome + 'titlebar.htm">' ) ;
    document.writeln( '    <frame name="Main" noresize scrolling="auto" src="' + window.location + '">' ) ;
    document.writeln( '  </frameset>' ) ;
    document.writeln( '</frameset>' ) ;
    document.writeln( '</html>' ) ;
    document.close() ;

    // parent.frames['Main'].location = window.location ;

    bFramed = true ;
    // updateToolbar() ;
  }
}


// this function is called from main pages to update the titlebar in the top frame
function updateTitlebar() {
  if ( ! bFramed ) return ;

  var strCurrentFile = ("" + document.location).substr( strSiteHome.length ) ;
  // alert( strSiteHome + "\n" +
  //        strCurrentFile ) ;

  parent.frames['Titlebar'].location.replace(
      strSiteHome + "titlebar.htm?filename=" + strCurrentFile ) ;

  updateToolbar() ;
}


// this function is called from main pages to update the toolbar in the left-hand frame
function updateToolbar() {
  if ( ! bFramed ) return ;

  var frameToolbar = parent.frames['Toolbar'] ;
  var strFrameToolbarLoc = "" + frameToolbar.location ;

  if ( strShortCourseNo == "htm" || strShortCourseNo == "jsp" ) {
    if ( strFrameToolbarLoc != strSiteHome + "jessehometoolbar.htm" ) {
      strFrameToolbarLoc = strSiteHome + "jessehometoolbar.htm" ;
    }
  } else {
    if ( strShortCourseNo.length == 3 &&
        strFrameToolbarLoc != strShortCourseNo + "toolbar.htm" ) {
      strFrameToolbarLoc = strCourseHome + strShortCourseNo + "toolbar.htm" ;
    } else if ( strFrameToolbarLoc != strSiteHome + "jessehometoolbar.htm" ) {
      strFrameToolbarLoc = strSiteHome + "jessehometoolbar.htm" ;
    }
  }
  frameToolbar.location.replace( strFrameToolbarLoc ) ;
}

// function updateToolbar0() {
//   if ( ! bFramed ) return ;
//
//   var frameToolbar = parent.frames['Toolbar'] ;
//   var strFrameToolbarLoc = "" + frameToolbar.location ;
//
//   if ( strShortCourseNo == "htm" || strShortCourseNo == "jsp" )
//   {
//     if ( strFrameToolbarLoc != strSiteHome + "jessehometoolbar.htm" )
//       frameToolbar.location = strSiteHome + "jessehometoolbar.htm" ;
//   }
//   else if ( strShortCourseNo.length == 3 &&
//             strFrameToolbarLoc != strShortCourseNo + "toolbar.htm" )
//     frameToolbar.location = strCourseHome + strShortCourseNo + "toolbar.htm" ;
//   else if ( strFrameToolbarLoc != strSiteHome + "jessehometoolbar.htm" )
//     frameToolbar.location = strSiteHome + "jessehometoolbar.htm" ;
//
//   // the delay is needed ...
//   window.setTimeout( "parent.frames['Toolbar'].location.reload()", 1000 ) ;
// }


// display the global part of the page footer
function showGlobalBottomMatter( strGraphic, strSectionOverride ) {
  // document.write( '<br clear="all"><hr color="#0000FF">' ) ;
  document.write( '<hr color="#0000FF"></hr>' ) ;

  if ( strGraphic == null || strGraphic == "CourseHome" || strGraphic == "" ) {
    // display course home page graphic
    document.write( '<a href="' + strCourseHome + 'index.htm">' +
        '<img src="' + strImagesLoc + 'arch0024.gif" ' +
        'border="0" width="112" height="129" align="right"></a>' ) ;
  // anonymous suggestion box graphic
  } else if ( strGraphic == "Suggest" ) {
    var strSuggestLoc = strCourseHome + "suggest.htm" ;   // for courses prior to Fall 2002
    if ( strCourseSemester == "Fall 2002" ||              // for Fall 2002 and subsequent courses
         strCourseSemester.substr( strCourseSemester.length-4 ) >= "2003" )
      strSuggestLoc = strSiteHome + "suggest.jsp?courseID=" + strCourseID ;
    document.write( '<a href="' + strSuggestLoc + '">' +
        '<img src="' + strImagesLoc + 'busi0197.gif" ' +
        'border="0" width="163" height="130" align="right"></a>' ) ;
  }
  // user-supplied graphic
  else {
    document.write( '<a href="' + strCourseHome + 'index.htm">' +
        '<img src="' + strGraphic + '" border="0" align="right"></a>' ) ;
  }
  
  // display course number and title
/*
  document.write( '<b><font color="#0000FF"><font size="6">' + strCourseNo ) ;
  document.write( '<br/></font><font size="5">' + strCourseTitle + '</font></b>' ) ;
*/
  document.write( '<h1 class="notopbot large">' + getDblCourseNo() + '</h1>' ) ;
  document.write( '<h1 class="notopbot">' + strCourseTitle + '</h1>' ) ;

  // the next line is required to achieve the desired formatting in Netscape 4.7
  // document.writeln( '</b><font color="#0000FF">' ) ;

  // show section number and professor name
/*
  document.write( '<br/><font size="4">' + strCourseSemester + ', ' ) ;
  if ( typeof( strSectionOverride ) == "undefined" || strSectionOverride == "" || strSectionOverride == null )
    document.write( 'Section' +
        ( ( strCourseSection.length > 3 ) ? 's ' : ' ' ) + strCourseSection ) ;
  else
    document.write( strSectionOverride ) ;
  document.write( '</font><br/>' ) ;
  document.write( '<font size="1"><br/></font>' ) ;
  document.write( '<font size="4">' + strProf + '</font>' ) ;
  document.write( '<br clear="all">' ) ;
*/
  document.write( '<h2 class="notopbot nobold">' + strCourseSemester + ', ' ) ;
  if ( typeof( strSectionOverride ) == "undefined" || strSectionOverride == "" || strSectionOverride == null ) {
    document.write( 'Section' +
        ( ( strCourseSection.length > 3 ) ? 's ' : ' ' ) + strCourseSection ) ;
  } else {
    document.write( strSectionOverride ) ;
  }
  document.write( '</h2><br/>' ) ;
  document.write( '<h2 class="notopbot nobold">' + strProf ) ;
  if ( typeof( strCoCourseProf ) != "undefined" && strCoCourseProf != null && strCoCourseProf != "" ) {
    document.write( '<br/>' + strCoCourseProf ) ;
  }
  document.write( '</h2>' ) ;
  document.write( '<br clear="all">' ) ;

  // department and university links
/*
  document.write( '<center><b><em>' ) ;
  document.write( '<a href="http://www.uml.edu" target="_top">University&nbsp;of&nbsp;Massachusetts&nbsp;Lowell</a>&nbsp;-- ' ) ;
  document.write( '<a href="http://www.cs.uml.edu" target="_top">Department&nbsp;of&nbsp;Computer&nbsp;Science</a>' ) ;
  document.write( '</em></b></center>' ) ;
*/
  document.write( '<h4 align="center" class="notopbot"><em>' ) ;
  document.write( '<a href="http://www.uml.edu" target="_top">University&nbsp;of&nbsp;Massachusetts&nbsp;Lowell</a>&nbsp;-- ' ) ;
  document.write( '<a href="http://www.cs.uml.edu" target="_top">Department&nbsp;of&nbsp;Computer&nbsp;Science</a>' ) ;
  document.write( '</em></h4>' ) ;
  document.write( '<hr color="#0000FF"></hr>' ) ;
}


// show frame or unframe button
// bRight = true (default) if button should be aligned right
function showFrameButton( bRight ) {
  // set default
  if ( bRight == undefined ) bRight = true ;

  if ( ! bFramed ) {
    document.write(
      '<img id="imgRestoreFrames" name="imgRestoreFrames" src="' + strImagesLoc + 'frameicon.gif" ' +
      'alt="Restore Frames" printerfriendly="keep" ' +
      'title="Restore Frames" ' ) ;   // Netscape uses the title attribute for tooltips
    if ( bRight )
      document.write( 'align="right" ' ) ;
    document.write(
      'border="1" hspace="2" width="24" height="24" ' +
      'onMouseOver="this.style.cursor=\'hand\'" ' +
      'onMouseDown="this.src=\'' + strImagesLoc + 'frameicon_down.gif\'" ' +
      'onMouseOut="this.src=\'' + strImagesLoc + 'frameicon.gif\'" onClick="restoreFrames();">' ) ;
  } else {
    document.write(
      '<img id="imgRemoveFrames" name="imgRemoveFrames" src="' + strImagesLoc + 'noframes.gif" ' +
      'alt="Remove Frames" printerfriendly="keep" ' +
      'title="Remove Frames" ' ) ;   // Netscape uses the title attribute for tooltips
    if ( bRight )
      document.write( 'align="right" ' ) ;
    document.write(
      'border="1" hspace="2" width="24" height="24" ' +
      'onMouseOver="this.style.cursor=\'hand\'" ' +
      'onMouseDown="this.src=\'' + strImagesLoc + 'noframes_down.gif\'" ' +
      'onMouseOut="this.src=\'' + strImagesLoc + 'noframes.gif\'" onClick="removeFrames();">' ) ;
  }
}


// show reload page button
// bRight = true (default) if button should be aligned right
function showReloadButton( bRight ) {
  // set default
  if ( bRight == undefined ) bRight = true ;

  document.write(
    '<img id="imgReloadPage" name="imgReloadPage" src="' + strImagesLoc + 'refreshicon.gif" ' +
    'alt="Reload Page" printerfriendly="keep" ' +
    'title="Reload Page" ' ) ;   // Netscape uses the title attribute for tooltips
  if ( bRight )
    document.write( 'align="right" ' ) ;
  document.write(
    'border="1" hspace="2" width="24" height="24" ' +
    'onMouseOver="this.style.cursor=\'hand\'" ' +
    'onMouseDown="this.src=\'' + strImagesLoc + 'refreshicon_down.gif\'" ' +
    'onMouseOut="this.src=\'' + strImagesLoc + 'refreshicon.gif\'" onClick="location.reload( true );">' ) ;
}


// show print page button
// bRight = true (default) if button should be aligned right
// bPrinterFriendlyVersionAvailable = true if a printer friendly version of the current page
//    is available, default = false
function showPrintButton( bRight, bPrinterFriendlyVersionAvailable ) {
  // set defaults
  if ( bRight == undefined ) {
    bRight = true ;
  }
  if ( bPrinterFriendlyVersionAvailable == undefined ) {
    bPrinterFriendlyVersionAvailable = false ;
  }

  // bPF = true for printer friendly version
  var bPF = ( getParameter( "pf" ) == "true" ) ;

  // alert( bPrinterFriendlyVersionAvailable ) ;
  // bPrinterFriendlyVersionAvailable = true ;
  // alert( bPrinterFriendlyVersionAvailable ) ;
  // alert( bPF ) ;

  document.write(
    '<img id="imgPrintPage" name="imgPrintPage" src="' + strImagesLoc + 'printicon.gif" ' +
    'alt="Print Page" printerfriendly="keep" ' +
    'title="Print Page" ' ) ;   // Netscape uses the title attribute for tooltips
  if ( bRight ) {
    document.write( 'align="right" ' ) ;
  }
  document.write(
    'border="1" hspace="2" width="24" height="24" ' +
    'onMouseOver="this.style.cursor=\'hand\'" ' +
    'onMouseDown="this.src=\'' + strImagesLoc + 'printicon_down.gif\'" ' +
    'onMouseOut="this.src=\'' + strImagesLoc + 'printicon.gif\'" ' ) ;

  if ( false && bPrinterFriendlyVersionAvailable && ! bPF ) {
    document.write( 'onClick="objNewWindow = window.open( \'' + document.location.pathname +
      '?pf=true\', \'_blank\', \'\', true ) ; objNewWindow.print()"' ) ;
  } else {
    document.write( 'onClick="window.print();"' ) ;
  }
  document.write( '>' ) ;
}


/** This function adjusts images to their printer friendly sizes (1/2 normal size).
 *  A prior version left images that have a printerfriendly="keep" attribute alone,
 *  but as of October 8, 2005, user-defined HTML attributes only appear to be supported in
 *  Internet Explorer.  A second version left images that had both dimensions under
 *  32 pixels alone, but that restriction was later abandoned, too.  The current version
 *  resizes all images.
 *    This function alsow displays a message about what's going on in the page's div
 *  object with an id of "divPrinterFriendlyMessage".
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  updated by JMH on October 08, 2005 at 01:05 PM
 *  Parameters:
 *     none
 *  Return Value:
 *     none
 */
function PerformPrinterFriendlyAdjustment( bPF ) {
  // display an appropriate message
  var strPrinterFriendlyMessage = "" ;
  if ( bPF ) {
    strPrinterFriendlyMessage += "<h5 style='color: red'>" ;
    strPrinterFriendlyMessage += "This document is being displayed in <b>printer-friendly format</b>.&nbsp; " ;
    strPrinterFriendlyMessage += "After printing, you may safely " +
        "<span onclick='window.close()' style='font-style: normal ; color: red' " +
        "onMouseOver='this.style.cursor=\"hand\"'><u><b>close this window</b></u></span>." ;
    strPrinterFriendlyMessage += "</h5>" ;
  } else {
    strPrinterFriendlyMessage += "<h5 style='color: blue'>" ;
    strPrinterFriendlyMessage += "A <a href='" + window.location + "?pf=true' target='_blank' " +
        "style='font-style: normal ; color: blue'><b>printer-friendly</b></a> " +
        "version of this document is available." ;
    strPrinterFriendlyMessage += "</h5>" ;
  }
  document.getElementById( "divPrinterFriendlyMessage" ).innerHTML = strPrinterFriendlyMessage ;

  if ( bPF ) {
    // halve the sizes of all images
    for ( var k = 0 ; k < document.images.length ; k++ ) {
      if ( true ||  // latest version resizes *all* images, so the following clauses are irrelevant
           document.images[ k ].printerfriendly != "keep" &&
           ( document.images[ k ].width > 32 || document.images[ k ].height > 32 ) ) {
        // save initial width to see if it changes when the height is changed
        //    this occurs if the image does not have explicit width and height attributes
        var initialWidth = document.images[ k ].width ;
        // halve the height
        document.images[ k ].height /= 2 ;
        // if the width was not halved, halve it
        if ( document.images[ k ].width == initialWidth ) {
          document.images[ k ].width /= 2 ;
        }
      }
    }
  }
}


// show add to favorites button -- N.B. requires Internet Explorer
function showAddToFavoritesButton( bRight ) {
  // check for IE, required for add to favorites button
  if ( ! document.all ) return ;

  // set default
  if ( bRight == undefined ) bRight = true ;

  document.writeln(
    '<img id="imgFavorites" name="imgFavorites" src="' + strImagesLoc + 'favoritesicon.gif" ' +
    'alt="Bookmark Page" printerfriendly="keep" ' +
    'title="Bookmark Page" ' ) ;   // Netscape uses the title attribute for tooltips
  if ( bRight ) document.write( 'align="right" ' ) ;
  document.write(
      'border="1" hspace="2" width="24" height="24" ' +
      'onMouseOver="this.style.cursor=\'hand\'" ' +
      'onMouseDown="this.src=\'' + strImagesLoc + 'favoritesicon_down.gif\'" ' +
      'onMouseOut="this.src=\'' + strImagesLoc + 'favoritesicon.gif\'"' +
      'onClick="addBookmark( document.location, document.title );">' ) ;
}


// show go to home page button
function showHomeButton( bRight, strAltText, strIconName ) {
  // set defaults
  // if ( bRight == undefined ) bRight = true ;
  if ( typeof( bRight ) == "undefined" )      bRight = true ;
  if ( typeof( strAltText ) == "undefined" )  strAltText = "Go to Course Home Page" ;
  if ( typeof( strIconName ) == "undefined" ) strIconName = "homeicon" ;

  document.writeln(
    '<img id="imgGoToHomePage" name="imgGoToHomePage" src="' + strImagesLoc + strIconName + '.gif" ' +
    'alt="' + strAltText + '" printerfriendly="keep" ' +
    'title="' + strAltText + '" ' ) ;   // Netscape uses the title attribute for tooltips
  if ( bRight ) document.write( 'align="right" ' ) ;
  document.write(
    'border="1" hspace="2" width="24" height="24" ' +
    'onMouseOver="this.style.cursor=\'hand\'" ' +
    'onMouseDown="this.src=\'' + strImagesLoc + strIconName + '_down.gif\'" ' +
    'onMouseOut="this.src=\'' + strImagesLoc + strIconName + '.gif\'" ' +
    'onClick="window.location = \'' + strCourseHome + '\' ;">' ) ;
}


// show switch stylesheets (font size) button
function showFontSizeButton( bSetFontImages, bRight ) {
  if ( typeof( GetCookie ) == "undefined" ) {
    return ;  // this function requires cookies.js to have been loaded
  }

  // set default
  if ( bRight == undefined ) {
    bRight = true ;
  }

  document.writeln(
    '<img id="imgFontSize" name="imgFontSize" src="' + strImagesLoc + 'blankicon.gif" ' +
    'alt="Font Size" printerfriendly="keep" ' +
    'title="Font Size" ' ) ;   // Netscape uses the title attribute for tooltips
  if ( bRight ) {
    document.write( 'align="right" ' ) ;
  }
  document.write(
    'border="1" hspace="2" width="24" height="24" ' +
    'onMouseOver="this.style.cursor=\'hand\'" ' +
    'onMouseDown="setFontMouseDown( this )" ' +
    'onMouseOut="setFontMouseOut( this )" ' +
    'onClick="switchStyleSheets();">' ) ;

  if ( typeof( bSetFontImages ) != "undefined" && bSetFontImages ) {
    showFontSizeButtonImages() ;
  }
}


// show appropriate image on switch stylesheets (font size) button
function showFontSizeButtonImages() {
  for ( var k = 0 ; k < document.images.length ; k++ ) {
    var img = document.images.item( k ) ;         // .item is required by Netscape and OK for IE
    if ( img.alt.indexOf( "Font Size" ) != -1 ) {
      if ( strBasePointSize == 10 ) {
        img.src = strImagesLoc + "fonticonsmall.gif" ;
        img.alt = "Decrease Font Size" ;
        img.title = "Decrease Font Size" ;
        img.printerfriendly = "keep" ;
      } else if ( strBasePointSize == 8 ) {
        img.src = strImagesLoc + "fonticonbig.gif" ;
        img.alt = "Increase Font Size" ;
        img.title = "Increase Font Size" ;
        img.printerfriendly = "keep" ;
      }
    }
  }
}


// show the frame or unframe button, the print button, and the reload button
// and optionally the add to favorites button and the go to home page button
function showPageManipulationButtons(
    bShowAddToFavorites,                   /* 1 */
    bShowGoToHomePage,                     /* 2 */
    bShowFrameButtons,                     /* 3 */
    bShowFontSize,                         /* 4 */
    bSetFontImages,                        /* 5 */
    bPrinterFriendlyVersionAvailable ) {   /* 6 */
  // set defaults
  if ( typeof( bShowFontSize ) == "undefined" ) {
    bShowFontSize = false ;
  }
  if ( typeof( bSetFontImages ) == "undefined" ) {
    bSetFontImages = true ;
  }
  if ( typeof( bPrinterFriendlyVersionAvailable ) == "undefined" ) {
    bPrinterFriendlyVersionAvailable = false ;
  }

  // frame or unframe button
  if ( typeof( bShowFrameButtons ) == "undefined" || bShowFrameButtons ) {
    showFrameButton() ;
  }

  showReloadButton() ;  // reload button

  showPrintButton( true, bPrinterFriendlyVersionAvailable ) ;   // print button

  // add to favorites button
  if ( bShowAddToFavorites && document.all ) {   // requires IE
    showAddToFavoritesButton() ;
  }

  // home page button
  if ( bShowGoToHomePage ) {
    showHomeButton() ;
  }

  // switch stylesheets button
  // if ( typeof( bShowFontSize ) != "undefined" && bShowFontSize ) {
    // if ( typeof( bSetFontImages ) == "undefined" )
    //   bSetFontImages = true ;
  if ( bShowFontSize ) {
    showFontSizeButton( bSetFontImages ) ;
  }
}


// add page to favorites
// source:  www.Express-Scripts.com
function addBookmark( bookMarkURL, bookMarkTitle ) {
  // var bookmarkurl = 'https://member.express-scripts.com' ;
  // var bookmarktitle = 'Express Scripts Members' ;
  window.external.AddFavorite( bookMarkURL, bookMarkTitle ) ;
}


// output a button spacer
function showButtonSpacer() {
  // spacer
  document.writeln(
    '<img src="' + strImagesLoc + 'transblk.gif" alt="" title="" align="right" ' +
    'border="0" hspace="2" width="4" height="24">' ) ;
}


// return today's date in ISO8601 format
function GetTodayISO8601() {
  var now = new Date() ;

  // modified per suggestion by student Nathan Gilbert on January 16, 2009 at 9:52 PM
  var strNowISO8601 = "" + ( now.getFullYear() < 1900 ? now.getFullYear()+1900 : now.getFullYear() ) + "-" ;
  strNowISO8601 += ( now.getMonth()+1 < 10 ? "0" + (now.getMonth()+1) : now.getMonth()+1 ) ;
  strNowISO8601 += "-" + ( now.getDate() < 10 ? "0" + now.getDate() : now.getDate() ) ;

  return strNowISO8601 ;
}


// return today's date in ISO8601 format
function DateToISO8601( dateObj ) {
  // modified per suggestion by student Nathan Gilbert on January 16, 2009 at 9:52 PM
  var strISO8601 = "" + ( dateObj.getFullYear() < 1900 ? dateObj.getFullYear()+1900 : dateObj.getFullYear() ) + "-" ;
  strISO8601 += ( dateObj.getMonth()+1 < 10 ? "0" + (dateObj.getMonth()+1) : dateObj.getMonth()+1 ) ;
  strISO8601 += "-" + ( dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate() ) ;

  return strISO8601 ;
}


// return 3-character abbreviation for weekday given a date string in ISO8601 format
function WeekdayAbbrev( strISO8601 ) {
  // handle dates like 2005-01-xx
  if ( strISO8601.substr( 8, 2 ) == "xx" ) {
    return "" ;
  }

  var strDate = DateISO8601( strISO8601 ).toString() ;  // standard date string
  var strAbbr = strDate.substr( 0, 3 ) ;                // extract day abbreviation
  return strAbbr ;
}


// return "Month Day" given a date string in ISO8601 format
function MonthDay( strISO8601 ) {
  // extract the month number and convert it to an integer
  var strMonth = strISO8601.substr( 5, 2 ) ;
  while ( strMonth.substr( 0, 1 ) == "0" ) {
    strMonth = strMonth.substr( 1, strMonth.length ) ;
  }
  var intMonth = parseInt( strMonth ) ;

  // extract the day number and convert it to an integer
  var strDay = strISO8601.substr( 8, 2 ) ;
  while ( strDay.substr( 0, 1 ) == "0" ) {  // parseInt does not like leading zeroes!
    strDay = strDay.substr( 1, strDay.length ) ;
  }
  var intDay = parseInt( strDay ) ;

  // return the month name and the day
  return arrMonth[intMonth-1] + " " + intDay ;
}


// return "Month Day, Year" given a date string in ISO8601 format
function MonthDayYear( strISO8601 )
{
  // append extracted year string to result of MonthDay function call
  return MonthDay( strISO8601 ) + ", " + strISO8601.substr( 0, 4 ) ;
}


// return "Weekday, Month Day, Year" given date string in ISO8601 format
function WeekdayMonthDayYear( strISO8601 ) {
  if ( typeof( strISO8601 ) == "undefined" ) { return "" ; }

  var strDate = DateISO8601( strISO8601 ).toString() ;  // standard date string
  var strAbbr = strDate.substr( 0, 3 ) ;                // extract day abbreviation
  var k ;   // local loop index

  // loop to determine day of week
  for ( k = 0 ; k < arrWeekday.length ; k++ ) {
    if ( arrWeekday[k].indexOf( strAbbr ) == 0 ) { break ; }
  }
  if ( k == arrWeekday.length ) { k = 0 ; }

  // return weekday name plus result of MonthDayYear function call
  return arrWeekday[k] + ", " + MonthDayYear( strISO8601 ) ;
}


// return "Weekday, Month Day, Year" given a date object
function DateObjectToWeekdayMonthDayYear( dateObj ) {
  if ( typeof dateObj === "undefined" ) { return "" ; }
  return WeekdayMonthDayYear( DateToISO8601( dateObj ) ) ;
}


// return "Weekday, Month Day, Year at HH:MM AM|PM" given a date object
function DateObjectToWeekdayMonthDayYearAtTime( dateObj ) {
  if ( typeof dateObj === "undefined" ) { return "" ; }
  return WeekdayMonthDayYear( DateToISO8601( dateObj ) ) + " at " + 
            jGetAMPMTime( dateObj, false, false) ;
}


// return a Date object given a date string in ISO8601 format
function DateISO8601( strISO8601 ) {
  // extract the year number and convert it to an integer
  var strYear = strISO8601.substr( 0, 4 ) ;
  while ( strYear.substr( 0, 1 ) === "0" ) {
    strYear = strYear.substr( 1, strYear.length ) ;
  }
  var intYear = parseInt( strYear ) ;

  // extract the month number and convert it to an integer
  var strMonth = strISO8601.substr( 5, 2 ) ;
  while ( strMonth.substr( 0, 1 ) === "0" ) {
    strMonth = strMonth.substr( 1, strMonth.length ) ;
  }
  var intMonth = parseInt( strMonth ) - 1;

  // extract the day number and convert it to an integer
  var strDay = strISO8601.substr( 8, 2 ) ;
  while ( strDay.substr( 0, 1 ) === "0" ) {  // parseInt does not like leading zeros
    strDay = strDay.substr( 1, strDay.length ) ;
  }
  var intDay = parseInt( strDay ) ;

  // construct and return a JavaScript Date object
  return new Date( intYear, intMonth, intDay ) ;
}


// return the number of milliseconds given a date string in ISO8601 format
function DateISO8601Milliseconds( strISO8601 ) {
  return DateISO8601( strISO8601 ).getTime() ;
}


// replace HTML entities (special symbols) with straight ASCII
function removeEntity( strOriginal, strSymbol ) {
  var pos = strOriginal.indexOf( strSymbol ) ;
  while ( pos != -1 ){
    var str = strOriginal.substring( 0, pos ) ;
  if ( strSymbol === "&amp;" ) {
      str += "&" ;
    } else if ( strSymbol === "&nbsp;" ) {
      str += " " ;
    }
    str += strOriginal.substring( pos + strSymbol.length ) ;
    strOriginal = str ;
    pos = strOriginal.indexOf( strSymbol ) ;
  }
  return strOriginal ;
}


// remove HTML in a string
function removeHTML( strOriginal ) {
  var pos = strOriginal.indexOf( "<" ) ;
  while ( pos != -1 ){
    var str = strOriginal.substring( 0, pos ) ;
    var posEnd = strOriginal.indexOf( ">" ) ;
    if ( posEnd == -1 ) {
      posEnd = strOriginal.length ;
    }
    str += strOriginal.substring( posEnd+1, strOriginal.length ) ;
    strOriginal = str ;
    pos = strOriginal.indexOf( "<" ) ;
  }
  return strOriginal ;
}


// pad a number expressed as a string with leading zeros to a specified width
function jLeadingZeroes( nString, width ) {
  nString = "" + nString ;
  while ( nString.length < width ) {
    nString = "0" + nString ;
  }
  return nString ;
}


// pad a number expressed as a string with trailing zeros to a specified number of decimal places
// added by JMH on November 3, 2013 at 10:50 AM
function jTrailingZeroes( nString, nPlaces ) {
  nString = "" + nString ;
  if ( nPlaces > 0 ) {
    nString += ( nString.indexOf( "." )  === -1 ? "." : "" ) ;
    pos = nString.indexOf( "." ) ;
    while ( nString.length - pos - 1 < nPlaces ) {
      nString += "0" ;
    }
  }
  return nString ;
}


// this function returns the current time in HH:MM:SS AM|PM format
// date - date object to format
// bsec - true if the seconds should be printed with the time
// btz  - true if the time zone should also be printed
function jGetAMPMTime( date, bsec, btz ) {
  var strDate = date.toString() ;
  var posLParen, posSpace ;  // positions of left paren and space

  var ampm = " AM" ;
  if ( date.getHours() > 11 ) {
    ampm = " PM" ;
  }

  var strTime = date.getHours() % 12 ;
  if ( strTime == 0 ) {
    strTime = 12 ;
  }

  strTime += ":" + jLeadingZeroes( date.getMinutes(), 2 ) ;
  if ( bsec ) strTime += ":" + jLeadingZeroes( date.getSeconds(), 2 ) ;
  strTime += ampm ;

  // add time zone
  // note that Safari returns different strings on iPads/iPhones than on Windows (sigh)
  if ( btz ) {
    if ( ( posLParen = strDate.indexOf( "(" ) ) > 0 ) {
      if ( isSafari && getNavigatorUserAgentPlatform() !== "Windows" ) {
        strTime += " " + strDate.substr( posLParen+1, 3 ) ;
      } else {  // not Safari
        strTime += " " + strDate.substr( posLParen+1, 1 ) ;
        posSpace = strDate.indexOf( " ", posLParen ) ;
        strTime += strDate.substr( posSpace+1, 1 ) ;
        posSpace = strDate.indexOf( " ", posSpace + 1 ) ;
        strTime += strDate.substr( posSpace+1, 1 ) ;
      }
    } else {  // Internet Explorer
      strTime += " " + date.toString().substr( date.toString().length-8, 3 ) ;
    }
  }

  return strTime ;
}


/** This function shows a file's last modified date.
 *  N.B.  The lastModified property of SHTML files is always the current date and time.
 *        Therefore, in SHTML files, include a global variable named shtmlLastModified that
 *        contains the date and time in "June 27, 2009 at 11:03 AM" format (generated by my
 *        UltraEdit template).  If this variable is present, it is parsed by this method
 *        and the last modified date is adjusted appropriately.
 *  @param  doc    Document object to show last modified date of
 */
function getLastModifiedDate( doc, shtmlLastModified ) {
  var d = new Date( doc.lastModified ) ;
  // document.writeln ( "d = " + d + "<br/>" ) ;
  // document.writeln ( "shtmlLastModified  = " + shtmlLastModified  + "<br/>" ) ;

  // the format of shtmlLastModified must be "June 27, 2009 at 10:28 AM"
  if ( typeof( shtmlLastModified ) != "undefined" && shtmlLastModified != null ) {
    var regex = / |,|:/ ;
    var parsedDate = shtmlLastModified.split( regex ) ;
        // parsedDate[0] = month name (string)
        // parsedDate[1] = month day (string)
        // parsedDate[2] = ""
        // parsedDate[3] = 4-digit year (string)
        // parsedDate[4] = "at"
        // parsedDate[5] = hour (string)
        // parsedDate[6] = minute (string)
        // parsedDate[7] = "AM" | "PM"
    for ( nMonth = 0 ; nMonth < 12 ; nMonth++ ) {
      if ( parsedDate[ 0 ] == arrMonth[ nMonth ] ) {
        d.setMonth( nMonth ) ;
        break ;
      }
    }
    d.setDate( parseInt( parsedDate[ 1 ] ) ) ;  // parseInt not required in some browsers

    // fieldno variable added to accommodate IE8, which skips parsedDate[3]
    var fieldno = ( parsedDate[2] == "," || parsedDate[2] == "" ? 3 : 2 ) ;
    d.setFullYear( parseInt( parsedDate[ fieldno ] ) ) ;

    fieldno += 2 ;
    if ( parsedDate[ fieldno ] == "12" && parsedDate[ fieldno+2 ] == "AM" ) {
      d.setHours( 0 ) ;
    } else if ( parseInt( parsedDate[ fieldno ] ) < 12 && parsedDate[ fieldno+2 ] == "PM" ) {
      d.setHours( parseInt( parsedDate[ fieldno ] ) + 12 ) ;
    } else {
      d.setHours( parseInt( parsedDate[ fieldno ] ) ) ;
    }
    d.setMinutes( parseInt( parsedDate[ fieldno+1 ] ) ) ;
  }

  return arrWeekday[d.getDay()] + ", " +
         arrMonth[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() +
         " at " + jGetAMPMTime( d, false, false) ;
}


/** This function shows a file's last modified date.
 *  N.B.  The getLastModifiedDate function is IE-specific and not supported by Netscape 6.2.
 *        However, as of September 2005 it now works OK in Netscape 8.0.3.
 *  @param  doc      Document object to show last modified date of
 *  @param  ptsz     point size to display text in
 *  @param  addbr    true = add <br/> before text, default = true
 *  @param  bCopy    true = add copyright JMH, default = true
 *  @param  bUML     true = add copyright UML, default = false
 *  @param  strColor color in CSS format, default = black
 */
function showLastModifiedDate( doc, ptsz, addbr, bCopy, bUML, shtmlLastModified, strColor ) {
  // set document to current document if not specified
  if ( typeof( doc ) == "undefined" || doc == null ) {
    doc = document ;
  }

  // set color to black if not specified
  if ( typeof( strColor ) == "undefined" || strColor == null ) {
    strColor = "black" ;
  }

  var d = new Date( doc.lastModified ) ;

  // This function now works OK in Netscape 8.0
  // // handle non-IE browsers
  // if ( navigator.appVersion.indexOf( "MSIE", 0 ) == -1 ) {
  //   document.write( '&nbsp;' ) ;
  //   return ;
  // }

  // set point size
  var strOut = '<h6 style="color: ' + strColor + ' ; font-style: normal ; font-weight: normal' ;
  if ( typeof( ptsz ) == undefined || ptsz == null ) {
    document.write( strOut + '">' ) ;
  } else {
    document.write( strOut + ' ; font-size: ' + ptsz + 'pt">' ) ;
  }

  // show text
  if ( addbr == null || addbr ) {
    document.write( '<br/>' ) ;
  }

  var strLocation = "" + location ;
  var strLocation = strLocation.substr( 0, strLocation.length - location.search.length ) ;
  document.writeln( '<em>This is document </em>' +
                    '<a href="' + location + '" target="_top">' + strLocation + '</a>' +
                    '<em>.&nbsp; It was last modified on ' + getLastModifiedDate( doc, shtmlLastModified ) +
                    ".&nbsp; " ) ;
  if ( bCopy == null || bCopy || bUML ) {
    var strLastModifiedYear = new Date( doc.lastModified ).getFullYear() ;
    document.write( 'Copyright &copy;&nbsp;' + strLastModifiedYear ) ;
    if ( strLastModifiedYear != (new Date()).getFullYear() ) {
      document.write( "-" + (new Date()).getFullYear() ) ;
    }
    if ( ! bUML ) {
      document.writeln( ' by <nobr>Jesse M. Heines.&nbsp;</nobr> All rights reserved.&nbsp;' +
                        ' May be freely copied or excerpted for educational purposes with' +
                        ' credit to the author.' ) ;
    } else {
      document.writeln( ' by the <nobr>University of Massachusetts Lowell.</nobr>&nbsp; All rights reserved.&nbsp;' +
                        ' May be freely copied or excerpted for educational purposes with' +
                        ' credit to the copyright holder.' ) ;
    }
  }
  document.writeln( '</em></h6>' ) ;
}


// this function displays the Anonymous Suggestion Box
function AnonymousSuggestionBox() {
  document.writeln( '<center>' ) ;
  document.writeln( '<hr width="100%">' ) ;
  document.writeln( '<font color="#0000FF">' ) ;

  parent.document.title = strCourseNo + " Anonymous Suggestion Box" ;
  document.writeln( '<font size="+2">' + strCourseNo + ' ' + strCourseTitle + '</font><br/>' ) ;

  document.writeln( '<b><font size="+3">Anonymous Suggestion&nbsp;Box</font></b>' ) ;
  document.writeln( '</font>' ) ;
  document.writeln( '<hr width="100%">' ) ;
  document.writeln( '</center>' ) ;

  // revision for Spring 2003 semester
  document.writeln( '<p>' ) ;
  showPageManipulationButtons() ;
  document.writeln( 'The Anonymous Suggestion Box has been removed from this Web site due to ' +
                    'abuses of its purpose.</p>' ) ;
  document.writeln( 'Please click the graphic below to return to the Home Page for this course.</p>' ) ;
  return ;

  // the following code is no longer executed
  document.writeln( '<p>' ) ;
  showPageManipulationButtons() ;
  document.writeln( 'This form allows you to submit an <em><b>anonymous</b></em> suggestion or' ) ;
  document.writeln( 'comment directly to me. </p>' ) ;

  document.writeln( '<p>When you click the <font face="System">Submit Anonymous Suggestion With No' ) ;
  document.writeln( 'Response</font> button, the text you enter in the text box below is emailed ' ) ;
  document.writeln( 'to me with the return address &#147;UML CS Web Server.&#148;&nbsp; ' ) ;
  document.writeln( '<em>No indication of your personal email address is sent, nor is' ) ;
  document.writeln( 'any record kept of your identity.</em>&nbsp; Thus, you may say whatever you want.</p>' ) ;

  document.writeln( '<p><b><em><font color="#FF0000"><u>Please Note</u>:</font></em></b>&nbsp; When I say ' ) ;
  document.writeln( 'sending email using this form is completely <b> anonymous</b>, <em><b>I really mean it!</b></em>&nbsp; ' ) ;
  document.writeln( 'In the past, some students have used this form to ask me questions and I have ' ) ;
  document.writeln( 'been unable to respond to them because <em>I don&#146;t know who they are!</em></p>' ) ;

  document.writeln( '<p>If you want me to respond to you, please click on ' ) ;
  document.writeln( '<a href="mailto:heines@cs.uml.edu">heines@cs.uml.edu</a> ' ) ;
  document.writeln( 'to send normal email. </p>' ) ;

  document.writeln( '<form action="http://www.cs.uml.edu/cgi-bin/emailform" method="POST" ' +
                    'onsubmit="return confirm( \'If you asked a question in your message, Prof. Heines will not be able to respond to you.  You must ask questions via normal email.  If you still want to send your message, click the OK button below.  Otherwise, click the Cancel button.\');">' ) ;
  document.writeln( '<p>Type your suggestion or comment here:</p>' ) ;
  document.writeln( '<p><textarea name="suggestion" rows="8" cols="47"></textarea></p>' ) ;
  document.writeln( '<p><input type="submit" name="submit" value="Submit Anonymous Suggestion With No Response"> <input type=reset name="reset" value="Clear Suggestion"></p>' ) ;

  document.writeln( '<input type="hidden" name="mailsubject" value="' +
      strCourseNo + ' ' + strCourseSemester + ' Anonymous Suggestion Box">' ) ;

  document.writeln( '<input type="hidden" name="mailto" value="heines@cs.uml.edu">' ) ;
  document.writeln( '</form>' ) ;
  document.writeln( '<p>Thanks!</p>' ) ;
}


// this function displays the course roster
// two professor functionality added for Fall 2008 semester
// show weblab account functionality added for Fall 2010 semester
function RosterListing( arrRoster, strTimeStamp, objProf, objTA,
                        strPictureDirectory, objProf2, bShowWebLabAcct, bShowNingProfileSite ) {
  if ( jmhDebug ) {
    document.writeln( "<table border='1'>" ) ;
    // document.writeln( arrRoster.length ) ;
    for ( k1 = 0 ; k1 < arrRoster.length-1 ; k1++ ) {
      document.writeln( "<tr>" ) ;
      for ( k2 = 0 ; k2 < 8 ; k2 ++ ) {
        document.writeln( "<td>" ) ;
        x = arrRoster[ k1 ][ k2 ] ;
        document.writeln( x == "" ? "&nbsp;" : x ) ;
        document.writeln( "</td>" ) ;
      }
      document.writeln( "</tr>" ) ;
    }
    document.writeln( "</table>" ) ;
  }

  var bLinkPictures = false ;   // do not link in pictures

  var strCourseID = getParameter( "courseID" ) ;
  if ( bShowWebLabAcct == undefined ) {
    bShowWebLabAcct =         // whether to show weblab.cs.uml.edu links
        ( strCourseID == "91.461-2010-11f" || strCourseID == "91.462-2010-11s" ) ;
  }
  if ( bShowNingProfileSite == undefined ) {
    bShowNingProfileSite =    // whether to show weblab.cs.uml.edu links
        ( strCourseID == "91.212-2010-11s" ) ;
  }

  // set flag indicating if any student has an HTTP server
  var bHttpServer = false ;
  for ( var k = 0 ; k < arrRoster.length-1 ; k++ ) {
    if ( arrRoster[ k ][ 3 ].indexOf( "no HTTP server" ) != 0 ) {
      bHttpServer = true ;
      break ;
    }
  }

  // set flag indicating if any student has a Java server
  var bJavaServer = false ;
  for ( var k = 0 ; k < arrRoster.length-1 ; k++ ) {
    if ( arrRoster[ k ][ 2 ].indexOf( "no Java server" ) != 0 ) {
      bJavaServer = true ;
      break ;
    }
  }

  // show top matter
  setRosterListingTitle() ;
  setTopMatter( "Class Roster" ) ;

  // show buttons
  document.writeln( '<p>' ) ;
  showPageManipulationButtons( false, true, true, true, true ) ;
  document.writeln( '<em>' + strTimeStamp + '</em>' ) ;
  document.writeln( '<br clear="all" />' ) ;
  document.writeln( '<br clear="all" />' ) ;
  document.writeln( '</p>' ) ;

  // start table
  document.writeln( '<table align="center" border="0">' ) ;

  // column heads
  document.writeln( '<thead>' ) ;
  document.writeln( '  <th bgcolor="black"><font color="white">#</font></th>' ) ;
  document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
  document.writeln( '  <th bgcolor="black"><font color="white">Name</font></th>' ) ;
  document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
  document.writeln( '  <th bgcolor="black"><font color="white"> ' +
                    ( bShowSecondaryEmailAddresses ? "" : "Primary " ) +
                    'Email Address</font></th>' ) ;
  if ( bHttpServer ) {
    document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
    document.writeln( '  <th bgcolor="black"><font color="white">HTTP Server</font></th>' ) ;
  }
  if ( bJavaServer ) {
    document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
    document.writeln( '  <th bgcolor="black"><font color="white">Java Server</font></th>' ) ;
  }
  if ( strCourseID == "91.513-2009-10f" || bShowWebLabAcct ) {
    document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
    document.writeln( '  <th bgcolor="black"><font color="white">&nbsp;WebLab Account URL&nbsp;</font></th>' ) ;
  }
  if ( bShowNingProfileSite ) {
    document.writeln( '  <th><code>&nbsp;&nbsp;</code></th>' ) ;      // spacer
    document.writeln( '  <th bgcolor="black"><font color="white">&nbsp;Ning Profile Name&nbsp;</font></th>' ) ;
  }
  document.writeln( '</thead>' ) ;

  if ( true ) {
    document.writeln( "<tr><td colspan='20' class='colorRed'>&nbsp;<br><em>The class roster is no longer available.</em><br>&nbsp;</td></tr>" ) ;
  } else {
  
    // data for each student
    for ( var k = 0, n = 0 ; k < arrRoster.length-1 ; k++ ) {
      var strStudentName = arrRoster[ k ][ 0 ] ;
      var strFirstNameFirst = trim( strStudentName.split(",")[1] + " " + strStudentName.split(",")[0] ) ;
      var strLoginName = arrRoster[ k ][ 1 ].substring( 0, arrRoster[ k ][ 1 ].indexOf( "@" ) ) ;
  
      document.writeln( '  <tr>' ) ;
  
      // sequence number
      if ( arrRoster[ k ][4] == "" ) {
        document.writeln( '    <td valign="top" align="right">' + (++n) + '.</td>' ) ;   // student number
      } else {
        document.writeln( '    <td valign="top" align="right">' + arrRoster[ k ][ 4 ] + '</td>' ) ;   // no number
      }
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
  
      // student name and picture link
      document.writeln( '    <td valign="top" nowrap="nowrap">' ) ;
      if ( bLinkPictures && arrRoster[ k ][ 5 ] != "" ) {
        document.write( '<a href="' + strPictureDirectory + arrRoster[ k ][ 5 ] + '" target="_blank">' ) ;
      }
      document.write( strStudentName ) ;       // student name
      if ( bLinkPictures && arrRoster[ k ][ 5 ] != "" ) {
        document.write( '</a>' ) ;
      }
      if ( arrRoster[ k ][ 8 ] != "" ) {            // major
        document.write( ' (' + arrRoster[k][8] + ')' ) ;
      }
      document.writeln( '    </td>' ) ;
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
  
      // student email address
      document.writeln( '    <td valign="top">' ) ;
      if ( arrRoster[ k ][ 1 ].indexOf( "no CS email address" ) != 0 &&
           arrRoster[ k ][ 1 ].indexOf( "no email address supplied" ) != 0 &&
           arrRoster[ k ][ 1 ].indexOf( "not yet supplied" ) != 0 ) {
        document.write( '<a href="mailto:' + strFirstNameFirst + " <" + arrRoster[ k ][ 1 ] + '>?subject=' + getDblCourseNo() +
                          ':%20Message%20Sent%20From%20Course%20Roster%20Page">' ) ;
        document.write( arrRoster[ k ][ 1 ] ) ;
        document.writeln( '</a>' ) ;
      } else {
        document.writeln( '<span style="color: red"><em>' + arrRoster[ k ][ 1 ] + '</em></span>' ) ;
      }
      document.writeln( '    </td>' ) ;
  
      // student HTTP Server
      if ( bHttpServer ) {
        document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
        document.writeln( '    <td valign="top">' ) ;
        if ( arrRoster[ k ][ 3 ].indexOf( "no HTTP server" ) == 0 ||
             arrRoster[ k ][ 1 ].indexOf( "no email address" ) == 0 ){
          document.writeln( '<font color="red"><em>' + arrRoster[ k ][ 3 ] + '</em></font>' ) ;
        } else {
          document.writeln( '<a href="http://' + arrRoster[ k ][ 3 ] + '/~' + strLoginName + '" target="_top">' ) ;
          document.writeln( 'http://' + arrRoster[ k ][ 3 ] + '/~' + strLoginName ) ;
          document.writeln( '</a>' ) ;
        }
        document.writeln( '    </td>' ) ;
      }
  
      // student Java Server
      if ( bJavaServer ) {
        document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
        document.writeln( '    <td valign="top">' ) ;
        if ( arrRoster[ k ][ 2 ].indexOf( "no Java server" ) == 0 ||
             arrRoster[ k ][ 1 ].indexOf( "no email address" ) == 0 ) {
          document.writeln( '<font color="red"><em>' + arrRoster[ k ][ 2 ] + '</em></font>' ) ;
        } else if ( arrRoster[ k ][ 2 ].indexOf( "/" ) != -1 ) {
          document.writeln( '<a href="http://' + arrRoster[ k ][ 2 ] + '" target="_top">' ) ;
          document.writeln( 'http://' + arrRoster[ k ][ 2 ]   ) ;
          document.writeln( '</a>' ) ;
        } else {
          document.writeln( '<a href="http://' + arrRoster[ k ][ 2 ] + '/~' + strLoginName + '" target="_top">' ) ;
          document.writeln( 'http://' + arrRoster[ k ][ 2 ] + '/~' + strLoginName ) ;
          document.writeln( '</a>' ) ;
        }
        document.writeln( '    </td>' ) ;
      }
  
      // student weblab.cs.uml.edu account URL
      if ( strCourseID == "91.513-2009-10f" || bShowWebLabAcct ) {
        document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
        document.write(   '    <td valign="top">' ) ;
        if ( arrRoster[ k ][ 9 ].indexOf( "no weblab account" ) != 0 &&
             arrRoster[ k ][ 9 ].indexOf( "not yet assigned" ) != 0 ) {
          var weblaburl = "http://weblab.cs.uml.edu/~" + arrRoster[ k ][ 9 ] ;
          document.write( "<a href='" + weblaburl + "' target='_blank'>" + weblaburl + "</a>" ) ;
        } else {
          document.writeln( '<span style="color: red"><em>' + arrRoster[ k ][ 9 ] + '</em></span>' ) ;
        }
        document.writeln( '    </td>' ) ;
      }
  
      // student Ning profile listing URL
      if ( bShowNingProfileSite ) {
        document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
        document.write(   '    <td valign="top">' ) ;
        if ( arrRoster[ k ][ 10 ].indexOf( "no Ning profile" ) != 0 &&
             arrRoster[ k ][ 10 ].indexOf( "not yet signed up" ) != 0 &&
             arrRoster[ k ][ 10 ].indexOf( "not yet enrolled" ) != 0 ) {
          var urlNingProfileName = arrRoster[ k ][ 10 ] ;
          document.write( "<a href='" + urlNingProfileName + "' target='_blank'>" + 
              urlNingProfileName.substring( urlNingProfileName.lastIndexOf( "/" ) + 1 ) + "</a>" ) ;
        } else {
          document.writeln( '<span style="color: red"><em>' + arrRoster[ k ][ 10 ] + '</em></span>' ) ;
        }
        document.writeln( '    </td>' ) ;
      }
      
      document.writeln( '  </tr>' ) ;
  
      // student second email address
      // if ( document.location.hostname == 'localhost' ) {
      if ( bShowSecondaryEmailAddresses ) {
        if ( arrRoster[ k ][ 6 ] != '' ) {
          document.writeln( '  <tr>' ) ;
          document.writeln( '    <td></td>' ) ;
          document.writeln( '    <td></td>' ) ;   // spacer
          document.writeln( '    <td></td>' ) ;
          document.writeln( '    <td></td>' ) ;   // spacer
          document.write( '<td><a href="mailto:' + arrRoster[ k ][ 6 ] + '?subject=' + strCourseNo +
                            ':%20Message%20Sent%20From%20Course%20Roster%20Page">' ) ;
          document.write( arrRoster[ k ][ 6 ] ) ;
          document.writeln( '</a></td>' ) ;
          document.writeln( '  </tr>' ) ;
        }
        if ( arrRoster[ k ][ 7 ] != '' ) {
          document.writeln( '  <tr>' ) ;
          document.writeln( '    <td></td>' ) ;
          document.writeln( '    <td></td>' ) ;   // spacer
          document.writeln( '    <td></td>' ) ;
          document.writeln( '    <td></td>' ) ;   // spacer
          document.write( '<td><a href="mailto:' + arrRoster[ k ][ 7 ] + '?subject=' + strCourseNo +
                            ':%20Message%20Sent%20From%20Course%20Roster%20Page">' ) ;
          document.write( arrRoster[ k ][ 7 ] ) ;
          document.writeln( '</a></td>' ) ;
          document.writeln( '  </tr>' ) ;
        }
      }
    }
  }
  
  // blank row
  document.writeln( '  <tr><td>&nbsp;</td></tr>' ) ;

  // display professor data
  // modificed by JMH to handle two professors on September 8, 2008 at 3:00 PM
  for ( var k = 0 ; k < 2 ; k++ ) {
    if ( k == 1 ) {
      if ( objProf2 != null && objProf2.name != "" ) {
        objProf = objProf2 ;
      } else {
        continue ;
      }
    }

    if ( objProf.name.indexOf( "Prof. " ) == 0 ) {
      objProf.name = objProf.name.substring( 5 ) ;
    }
    var strHttpServer = "http://" + objProf.httpserver + "/~" +
        objProf.email.substr( 0, objProf.email.indexOf( "@" ) ) ;
    var strJavaServer = "http://" + objProf.javaserver + "/~" +
        objProf.email.substr( 0, objProf.email.indexOf( "@" ) ) ;

    document.writeln( '  <tr>' ) ;
    document.writeln( '    <td valign="top" align="right">Prof.</td>' ) ;             // title
    document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                    // spacer
    document.writeln( '    <td valign="top" nowrap="">' + objProf.name + '</td>' ) ;  // prof name
    document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                    // spacer
    document.writeln( '    <td valign="top" nowrap=""><a href="mailto:' + objProf.email + '">' +
        objProf.email + '</a></td>' ) ;  // prof email
    if ( bHttpServer ) {
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                  // spacer
      document.writeln( '    <td valign="top" nowrap=""><a href="' + strHttpServer +
          '">' + strHttpServer + '</a></td>' ) ;                                      // prof HTTP server
    }
    if ( bJavaServer ) {
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                  // spacer
      document.writeln( '    <td valign="top" nowrap=""><a href="' + strJavaServer +
          '">' + strJavaServer + '</a></td>' ) ;                                      // prof Java server
    }
    if ( strCourseID == "91.513-2009-10f" || bShowWebLabAcct ) {
      var weblaburl = "http://weblab.cs.uml.edu/~heines" ;
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;      // spacer
      document.write(   '    <td valign="top">' ) ;
      document.write( "<a href='" + weblaburl + "' target='_blank'>" + weblaburl + "</a>" ) ;
      document.writeln( '    </td>' ) ;
    }
    document.writeln( '  </tr>' ) ;
  }

  // display T.A. data

  // alert( "|" + objTA.name + "|" ) ;
  if ( objTA.name != " Announced, To Be" && objTA.name != "none" &&
       objTA.name != "<em>none</em>" && objTA.name != "<em>none</em>" ) {
    strHttpServer = "http://" + objTA.httpserver + "/~" +
        objTA.email.substr( 0, objTA.email.indexOf( "@" ) ) ;
    strJavaServer = "http://" + objTA.javaserver + "/~" +
        objTA.email.substr( 0, objTA.email.indexOf( "@" ) ) ;

    document.writeln( '  <tr>' ) ;
    document.writeln( '    <td valign="top" align="right">T.A.</td>' ) ;              // title
    document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                    // spacer
    document.writeln( '    <td valign="top" nowrap="">' + objTA.name + '</td>' ) ;    // TA name
    document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                    // spacer
    document.writeln( '    <td valign="top" nowrap=""><a href="mailto:' +
        objTA.email + '">' + objTA.email + '</a></td>' ) ;                            // TA email
    if ( bHttpServer ) {
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                  // spacer
      document.writeln( '    <td valign="top" nowrap=""><a href="' + strHttpServer +
          '">' + strHttpServer + '</a></td>' ) ;                                      // TA HTTP server
    }
    if ( bJavaServer ) {
      document.writeln( '    <td><code>&nbsp;&nbsp;</code></td>' ) ;                  // spacer
      document.writeln( '    <td valign="top" nowrap=""><a href="' + strJavaServer +
          '">' + strJavaServer + '</a></td>' ) ;                                      // TA Java server
    }
    document.writeln( '  </tr>' ) ;
  }

  document.writeln( '</table>' ) ;
}


// handler for links to the appropriate Ikonboard
function gotoIkonboard( strSearch ) {
  var e = window.event ;  // abbreviation for convenience of reference

  // use typeof( ... ) rather than "undefined" or undefined [without quotes]
  // for compatibility with IE 5.0
  if ( typeof( strSearch ) == "undefined" ) {
    // strSearch = "s=3d930d8905eca788;act=SC;c=1" ;
    strSearch = "" ;
  }

  // test for non-Ikonboard discussion board
  if ( strSearch.indexOf( "http://" ) != -1 ) {
    // alert( strSearch ) ;
    window.open( strSearch.substr( strSearch.indexOf( "http://" ) ), "_blank" ) ;
    return ;
  }

  // default board host system
  var strHost = "teaching-2.cs.uml.edu" ;

  // if both the Ctrl and Shift keys are held down, go to the
  // version on dolphin
  //    note that the first test of e is needed to create a boolean
  // shortcut if e is null, thus skipping evaluation of e.ctrlKey
  // which would cause a runtime error
  if ( e && ( e.ctrlKey && e.shiftKey ) ) {
    strHost = location.hostname ;
  }

  // window.top.location =
  //     "http://teaching-2.cs.uml.edu/cgi-bin/ikonboard/ikonboard.cgi" ;
  // window.open( "http://" + strHost + "/cgi-bin/ikonboard/ikonboard.cgi?" + strSearch,
  //              "_blank" ) ;
  window.open( "http://" + strHost + "/ikonboard/ikonboard.cgi?" + strSearch,
               "_blank" ) ;
}


/** This function gets the value of a named field and returns a single
 *  string value or null if the named parameter does not exist.  It is a
 *  simple renaming of function getField below and works by calling that
 *  function and returning its result.
 */
function getField( strName ) {
  return getParameter( strName ) ;
}


/** This function gets the value of a named parameter and returns a single
 *  string value or null if the named field does not exist.
 *
 *  If there is more than one field with the same name in the location.search
 *  string, this function returns only the first one.  If one knows that
 *  there will be more than one field with the same name, s/he should use
 *  the getMultiField function instead of this one.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Revised: by JMH on January 31, 2002 at 11:56 AM
 *  Parameters:
 *     (1)  strName  the name of the field to extract
 *  Return Value:
 *     string value of specified named parameter or null if the named parameter does not exist
 */
function getParameter( strName ) {
  // extract the address part starting at the "?"
  var strSearch = "" + location.search ;

  // find the location of the field name you're looking for
  var intStart = strSearch.indexOf( strName + "=" ) ;

  // make sure that field name is not part of a larger field name,
  // that is, a substring of a larger field name
  var boolOK = ( intStart > 0 ) &&
               ( strSearch.charAt( intStart-1 ) == "?" ||
                 strSearch.charAt( intStart-1 ) == "&" )

  // if the field is not found or is part of a larger field name,
  // return null
  if ( ! boolOK ) {
    return null ;

  // else extract the field's value and return it
  } else {
    // extract from the start of the value to the end of the entire
    // search string and append an ampersand to the end of the
    // extract value string
    var strValue =
      strSearch.substr( intStart + strName.length + 1 ) + "&" ;

    // find the position of the first ampersand in the value string
    // and return the substring ending at the first ampersand
    return strValue.substr( 0, strValue.indexOf( "&" ) ) ;
  }
}


/** This function gets the value(s) of a named field and returns an array
 *  of those values or null if the named field does not exist.  It is a
 *  simple renaming of function getMutliField below and works by calling that
 *  function and returning its result.
 */
function getMultiField( strName ) {
  return getMultiParameter( strName ) ;
}


/** This function gets the value(s) of a named parameter and returns an array
 *  of those values or null if the named field does not exist.
 *
 *  This function may always be used in place of the getParameter function,
 *  but getParameter may be more convenient when one knows that there is one
 *  and only one field with the specified name.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Revised: by JMH on January 31, 2002 at 05:09 PM
 *  Parameters:
 *     (1)  strName  the name of the field to extract
 *  Return Value:
 *     array containing the string values of specified named parameter or null if
 *        the named parameter does not exist
 */
function getMultiParameter( strName ) {
  // extract the address part starting at the "?"
  var strSearch = "" + location.search ;

  // find the location of the field name you're looking for
  var intStart = strSearch.indexOf( strName + "=" ) ;

  // make sure that field name is not part of a larger field name,
  // that is, a substring of a larger field name
  var boolOK = ( intStart > 0 ) &&
               ( strSearch.charAt( intStart-1 ) == "?" ||
                 strSearch.charAt( intStart-1 ) == "&" )

  // if the field is not found or is part of a larger field name,
  // return null
  if ( ! boolOK ) {
    return null ;

  // else extract the field's value and return it
  } else {
    var arrResult = new Array() ;  // array of strings to be returned
    var nResults = 0 ;             // number of string to be added

    while ( intStart > -1 )
    {
      // extract from the start of the value to the end of the entire
      // search string and append an ampersand to the end of the
      // extract value string
      arrResult[nResults] =
        strSearch.substr( intStart + strName.length + 1 ) + "&" ;

      // find the position of the first ampersand in the value string
      // and return the substring ending at the first ampersand
      arrResult[nResults] = arrResult[nResults].substr(
                                0, arrResult[nResults].indexOf( "&" ) ) ;

      // increment number of results and search again, but starting
      // after the last match found
      nResults++ ;
      intStart = strSearch.indexOf( strName + "=" , intStart + 1 ) ;
    }

    // return the result array
    return arrResult ;
  }
}


// This function provides rudimentary validation of a phone number.
// adapted from code supplied by Saurabh Singh
function CheckPhoneNumber( strNumber )
{
  var strGoodChars = "0123456789()-+ /." ;   // valid characters in a phone number
  for ( var k = 0; k < strNumber.length ; k++ ) {
    if ( strGoodChars.indexOf( strNumber.charAt( k ) ) == -1 ) {
      return false ;
    }
  }
  return true ;
}


// This function validates an email address.
// adapted from: http://www.codetoad.com/asp_email_reg_exp.asp
// ==>> does not appear to work correct as of August 29, 2004 at 12:19 PM!
function CheckEmail( strUserEmail )
{
  var reValidEmail =
          /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/ ;
  return ( reValidEmail.test( strUserEmail ) )
}


/** This function resizes the browser window to its maximum resizable size.
 *  Source:
 *    Auto Maximize Window Script- © Dynamic Drive (www.dynamicdrive.com)
 *    This notice must stay intact for use.
 *    Visit http://www.dynamicdrive.com/ for this script and 100's more.
 *    Note: Updated 12/04/00 to work in frames and NS6.
 *  This code was debugged with student David Peet on 2003-10-20.
 */
function maximizeWindow()
{
  top.window.moveTo( 0, 0 ) ;

  if ( isIE ) {   // IE
    top.window.resizeTo( screen.availWidth, screen.availHeight ) ;
  } else if ( document.layers || document.getElementById ) {  // Mozilla and Netscape
    if ( top.window.outerHeight < screen.availHeight ||
         top.window.outerWidth < screen.availWidth ) {
      top.window.outerHeight = screen.availHeight ;
      top.window.outerWidth = screen.availWidth ;
      top.window.moveTo( self.screenX, self.screenY ) ;
    }

    tmp1 = parent.outerWidth - parent.innerWidth;
    tmp2 = parent.outerHeight - parent.innerHeight;

    newWidth -= tmp1;
    newHeight -= tmp2;

    top.window.screenX = 0 ;
    top.window.screenY = 0 ;
  }
}


/** This function returns true if cookies are enabled and false if they are not.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Updated: by JMH on December 30, 2004 at 03:36 PM
 *  Parameters:
 *     none
 *  Return Value:
 *     boolean true if cookies are enabled, boolean false if they are not
 */
function CookiesEnabled() {
  SetCookie( "testcookie", "testcookie" ) ;
  var bCookiesEnabled = GetCookie( "testcookie" ) == "testcookie" ;
  DeleteCookie( "testcookie" ) ;
  return bCookiesEnabled ;
}


/** This function shows an image at its normal size or at 50% size depending on
 *  the value of the bPF (printer friendly) paramter.
 *
 *  Author:  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  updated by JMH on September 23, 2005 at 04:14 PM
 *  Parameters:
 *     strSrc         the URL of the image source - required
 *     intHeight      the real height of the image - if omitted, bPF is forced to false
 *     bPF            the printer friendly flag - default = false
 *     nBorderPixels  width of image border in pixels - default = 0
 *  Return Value:
 *     none
 */
function ShowImage( strSrc, intHeight, bPF, nBorderPixels ) {
  // set defaults
  if ( typeof( strSrc ) == "undefined" ) {
    return ;
  }
  if ( typeof( intHeight ) == "undefined" || typeof( bPF ) == "undefined" ) {
    bPF = false ;
  }
  if ( typeof( nBorderPixels ) == "undefined" ) {
    nBorderPixels = 0 ;
  }

  // add link to full-sized image if in printer-friendly format
  if ( bPF ) {
    document.write( '<a href="' + strSrc + '">' ) ;
  }

  // show image
  document.write( '<img src="' + strSrc + '" border="' + nBorderPixels + '" ' ) ;
  if ( bPF ) {
    document.write( 'height="' + intHeight / 2 + '" ' ) ;
  }
  document.write( '></img>' ) ;

  // close link to full-sized image if in printer-friendly format
  if ( bPF ) {
    document.write( '</a>' ) ;
  }
}


// source CitiCards, https://www.accountonline.com/CTPVerifyEnroll
// added by JMH on October 08, 2005 at 01:45 PM
function showErrorBang() {
  document.writeln( '<table width="40%" border="0" bgcolor="#FF0000" cellspacing="0" cellpadding="2" align="left">' ) ;
  document.writeln( '  <tr bgcolor="#FFFFFF" height="10">' ) ;
  document.writeln( '     <td height="10"><spacer type="block" height="10"></td>' ) ;
  document.writeln( '  </tr>' ) ;
  document.writeln( '  <tr>' ) ;
  document.writeln( '    <td>' ) ;
  document.writeln( '      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#FFFFFF">' ) ;
  document.writeln( '        <tr>' ) ;
  document.writeln( '          <td colspan="2" height="3"><spacer type="block" height="3"></td>' ) ;
  document.writeln( '        </tr>' ) ;
  document.writeln( '        <tr>' ) ;
  document.writeln( '          <td valign="bottom" align="left">&nbsp;&nbsp;<img src="/svc/content/images/errorbang.gif" width="33" height="34" border="0"></td>' ) ;
  document.writeln( '          <td valign="middle" align="center"><span class="errortext">See below for error messages.</span></td>' ) ;
  document.writeln( '        </tr>' ) ;
  document.writeln( '      </table>' ) ;
  document.writeln( '    </td>' ) ;
  document.writeln( '  </tr>' ) ;
  document.writeln( '  <tr bgcolor="#FFFFFF" height="10">' ) ;
  document.writeln( '    <td height="10"><spacer type="block" height="10"></td>' ) ;
  document.writeln( '  </tr>' ) ;
  document.writeln( '</table>' ) ;
}


// This function returns the combination of the course and co-course numbers if
// both exist, with the lower number listed first.  If no co-course number exists,
// only the course number is returned.
// added by JMH on December 31, 2008 at 10:30 AM
function getDblCourseNo() {
  if ( strCoCourseNo == "" ) {
    return strCourseNo ;
  } else if ( strCoCourseNo < strCourseNo ) {
    return strCoCourseNo + " / " + strCourseNo ;
  } else {
    return strCourseNo + " / " + strCoCourseNo ;
  }
}


// If running on cs.uml.edu, go to same page on teaching.cs.uml.edu.
// added by JMH on March 3, 2009 at 5:03 PM
function goToTeaching() {
  if ( window.location.hostname == "www.cs.uml.edu" ||
       window.location.hostname == "cs.uml.edu" ) {
    window.location.replace( "http://teaching.cs.uml.edu" +
        window.location.pathname + window.location.search ) ;
  }
}


// If running on cs.uml.edu, go to same page on teaching.cs.uml.edu.
// RegExp version, updated by JMH on October 5, 2011 at 12:02 PM
function goToTeaching2() {
  if ( window.location.hostname == "www.cs.uml.edu" ||
       window.location.hostname == "cs.uml.edu" ) {
    var host = ""+location.host ;
    if ( host == "www.cs.uml.edu" || host == "cs.uml.edu" ) {
      var pattern = new RegExp( host ) ;
      window.location.replace( (""+location).replace( pattern, "teaching.cs.uml.edu" ) ) ;
    }
  }
}


/** Add a link to the page on teaching.cs.uml.edu if not running on that machine
 *  updated by JMH on June 13, 2010 at 1:00 PM, adapted from the function in
 *    common-jspfns.jsp
 *  updated by JMH on July 4, 2010 at 10:02 AM to add optional arguments
 *  @param strMarginTop [optional] top margin in points
 *  @param strMarginBottom [optional] bottom margin in points
 *  @return String with link to corresponding page on teaching.cs.uml.edu
 */
function strLinkToTeaching() {
  var strResult = "" ;
  var strLocation = "" + window.location ;
  var strHostName = "" + window.location.hostname ;
  var strTeaching = strLocation.replace( strHostName, "teaching.cs.uml.edu" ) ;

  // ste top and bottom margins if specified, otherwise default to 0
  var strMarginTop = arguments.length > 0 ? arguments[0] : "0" ;
  var strMarginBottom = arguments.length > 1 ? arguments[1] : "0" ;

  // add link to page on teaching if not running on that machine
  if ( strHostName.indexOf( "teaching" ) == -1 ) {
    strResult += "<p style='margin-top: " + strMarginTop + "pt ; margin-bottom: " + strMarginBottom + "pt ; " +
        "text-align: center ; color: red'>[ " +
        "<a href='" + strTeaching + "' target='_blank' style='color: red'>" +
        "view this page on teaching.cs.uml.edu" +
        "</a> ]</p>" ;
  }
  return strResult ;
}


// precompute "constants" for the CountDownMessage function for ease 
//    of calculation in that function
var msPerMinute = 1000*60 ;       // no. of milliseconds per minute
var msPerHour = msPerMinute*60 ;  // no. of milliseconds per hour
var msPerDay= msPerHour*24 ;      // no. of milliseconds per day

// predefine CSS constants for the CountDownMessage function
var CountDownPrefix =
      "<span style='background-color: red ; color: white ; width: 2.5em ; " +
                   "display: inline-block ; text-align: center ; font-weight: bold ; " +
                   "border-bottom: 1px solid red'>" ;
var CountDownSuffix = "</span>" ;
var CountDownWhiteS = "<span style='color: white'>s </span>" ;

/** This function returns the time to a target event, displayed as days, hours,
 *    minutes, and seconds.  The first four arguments are required.
 *  Note that IE does not work if a DIV rather than a SPAN tag is used (sigh).
 *    Nothing is printed at all.  Very strange.
 *  updated by JMH on August 21, 2010 at 1:29 PM
 *  updated by JMH on November 6, 2010 at 7:12 PM
 *  tested on August 21, 2010 in Firefox, IE, Safari, and Chrome
 *  @param targetYear   year in which target event occurs
 *  @param targetMonth  month in which target event occurs (N.B. January = 0)
 *  @param targetDay    day of month in which target event occurs
 *  @param targetHour   hour at which target event occurs (N.B. midnight = 0)
 *  @param targetMinute minute at in which target event occurs
 */
function CountDownMessage( targetYear, targetMonth, targetDay, targetHour,
                           targetMinute, fgcolor, bgcolor ) {
  // for ( k = 0 ; k < 7 ; k++ ) {
  //   console.debug( arguments[k] ) ;
  // }

  // set defaults
  if ( fgcolor != undefined ) {
    CountDownPrefix = CountDownPrefix.replace( /red/g, fgcolor ) ;
  }
  if ( bgcolor != undefined ) {
    CountDownPrefix = CountDownPrefix.replace( /white/g, bgcolor ) ;
    CountDownWhiteS = CountDownWhiteS.replace( /white/g, bgcolor ) ;
  }
  
  // determine current date and time
  if ( targetMinute === undefined || targetMinute === null ) {
    targetMinute = 0 ;
  }
  var dateTarget =  // the date and time to count down to
        new Date( targetYear, targetMonth, targetDay, targetHour, targetMinute ) ;
  var dateNow = new Date() ;         // current date and time
  var delta = dateTarget-dateNow ;   // difference between target and now

  // compute time left
  var daysToGo    = Math.floor( delta / msPerDay ) ;
  var hoursToGo   = Math.floor( (delta-msPerDay*daysToGo) / msPerHour ) ;
  var minutesToGo =
        Math.floor( (delta-msPerDay*daysToGo-msPerHour*hoursToGo) / msPerMinute ) ;
  var secondsToGo = Math.floor(
        (delta-msPerDay*daysToGo-msPerHour*hoursToGo-msPerMinute*minutesToGo) / 1000 ) ;

  // return entire count down string
  return CountDownPrefix + daysToGo + CountDownSuffix + " day" +
            ( daysToGo != 1    ? "s " : CountDownWhiteS ) +
         CountDownPrefix + hoursToGo + CountDownSuffix + " hour" +
            ( hoursToGo != 1   ? "s " : CountDownWhiteS ) +
         CountDownPrefix + minutesToGo + CountDownSuffix + " minute" +
            ( minutesToGo != 1 ? "s " : CountDownWhiteS ) +
         CountDownPrefix + secondsToGo + CountDownSuffix + " second" +
            ( secondsToGo != 1 ? "s " : CountDownWhiteS ) ;
}


/** This function detects whether a scroll bar is present in the current window.
 *  === N.B. This function requires jQuery! ===
 *  source: http://stackoverflow.com/questions/681087/how-can-i-detect-a-scrollbar-presence-using-javascript-in-html-iframe
 *  added by JUM on October 9, 2011 at 11:09 AM
 */
// function isMyStuffScrolling() {
function isScrollBarPresent() {
  var docHeight = $(document).height();
  var scroll    = $(window).height() ;
  // if (docHeight > scroll) return true;
  // else return false;
  return ( docHeight > scroll ) ;
}


/** This function takes a "LastName, FirstName" and converts it to "FirstName LastName".
 *  @param strLastNameFirst name in "LastName, FirstName" format
 *  @return String name in "FirstName LastName" format
 */
function FirstNameFirst( strLastNameFirst ) {
  return strLastNameFirst.split(",")[1] + " " + strLastNameFirst.split(",")[0] ;
}


/** This function takes a NN.NNN-YYYY-YYS course ID and adds a link to that course at the
 *  bottom of a page.  The styling of the link is controlled by code in CourseHome.css.
 *  http://stackoverflow.com/questions/8824831/make-div-stay-at-bottom-of-pages-content-all-the-time-even-when-there-are-scrol
 *  updated by JMH on August 1, 2013 at 2:36 PM
 */   
var GoToCourseFooter = function( strCourseID ) {
  var regex1 = /^http:\/\/localhost\// ;
  var regex2 = /^http:\/\/192\.168\.1\.16\// ;
  if ( ( "" + document.location.href ).match( regex1 ) || 
       ( "" + document.location.href ).match( regex2 ) ||
       document.location.host === "192.168.1.16" ) {
    var strCourseNo = strCourseID.substring( 0, 6 ) ;
    var strShortCourseNo = strCourseID.substring( 3, 6 ) ;
    var strLoc = "/~heines/" + strCourseNo + "/" + strCourseID + "/" + strShortCourseNo + "home.jsp" ;
    $("body").append( "<footer id='gotocourse'></footer>" ) ;
    $("#gotocourse").append( "<a href='" + strLoc + "' class='nolinkunderline'>Go to " + strCourseNo + "</a>" ) ;
  }
}


/** This function takes a NN.NNN-YYYY-YYS course ID and adds a link to that course at the
 *  top right of a page.  The styling of the link is controlled by code in CourseHome.css.
 *  http://stackoverflow.com/questions/8824831/make-div-stay-at-bottom-of-pages-content-all-the-time-even-when-there-are-scrol
 *  updated by JMH on August 1, 2013 at 2:36 PM
 */   
var GoToCourseHeader = function( strCourseID ) {
  var regex1 = /^http:\/\/localhost\// ;
  var regex2 = /^http:\/\/192\.168\.1\.16\// ;
  if ( ( "" + document.location.href ).match( regex1 ) || 
       ( "" + document.location.href ).match( regex2 ) ) {
    var strCourseNo = strCourseID.substring( 0, 6 ) ;
    var strShortCourseNo = strCourseID.substring( 3, 6 ) ;
    var strLoc = "/~heines/" + strCourseNo + "/" + strCourseID + "/" + strShortCourseNo + "home.jsp" ;
    $("body").append( "<header id='gotocourseheader'></header>" ) ;
    $("#gotocourseheader").append( "<a href='" + strLoc + "' class='nolinkunderline'>Go to " + strCourseNo + "</a>" ) ;
  }
}


/** This function takes a NN.NNN-YYYY-YYS course ID and adds a link to that course at the
 *  top left of a page.  The styling of the link is controlled by code in CourseHome.css.
 *  @param strVertical   (string) "top" | "bottom"
 *  @param strHorizontal (string) "left" | "right"
 *  http://stackoverflow.com/questions/8824831/make-div-stay-at-bottom-of-pages-content-all-the-time-even-when-there-are-scrol
 *  updated by JMH on August 1, 2013 at 2:36 PM
 */   
var GoToCourse = function( strCourseID, strVertical, strHorizontal ) {
  if ( typeof( strVertical ) === "undefined" ) {
    strVertical = "top" ; 
  } else {
    strVertical = strVertical.toLowerCase() ;
    if ( strVertical !== "top" && strVertical !== "bottom" ) { 
      strVertical = "top" ; 
    }
  }
  if ( typeof( strHorizontal ) === "undefined" ) { 
    strHorizontal = "left" ; 
  } else {
    strHorizontal = strHorizontal.toLowerCase() ;
    if ( strHorizontal !== "left" && strHorizontal !== "right" )  {
      strHorizontal = "left" ; 
    }
  }
  var strPositionID = "gotocourse" + strVertical + strHorizontal ;
  // console.log( strPositionID ) ;
  var regex1 = /^http:\/\/localhost\// ;
  var regex2 = /^http:\/\/localhost:8080\// ;
  var regex3 = /^http:\/\/192\.168\.1\.16\// ;
  if ( ( "" + document.location.href ).match( regex1 ) || 
       ( "" + document.location.href ).match( regex2 ) || 
       ( "" + document.location.href ).match( regex3 ) ) {
    var strCourseNo = strCourseID.substring( 0, 6 ) ;
    var strShortCourseNo = strCourseID.substring( 3, 6 ) ;
    var strLoc = "/~heines/" + strCourseNo + "/" + strCourseID + "/" + strShortCourseNo + "home.jsp" ;
    $("body").append( "<header id='" + strPositionID + "'></header>" ) ;
    $("#"+strPositionID).append( "<a href='" + strLoc + "' class='nolinkunderline' target='_self'>Go to " + strCourseNo + "</a>" ) ;
  }
}


// Sorting an array of JavaScript objects
// http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
// 
// Here's a more flexible version, which allows you to create reusable sort functions, 
// and sort by any field.
// 
// Example calls:
//    // Sort by price high to low
//    homes.sort(sort_by('price', true, parseInt));
//
//    // Sort by city, case-insensitive, A-Z
//    homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
//
//    ---- C:\H-Drive\public_html\91.212\91.212-2014-15s\grading\Reflections.js
//    [251]     names.sort( sort_by( "name" ) ) ;
//    [428]     respondents.sort( sort_by( "namelastfirst", true ) ) ;
// 
// added by JMH on May 24, 2013 at 2:35 PM
//
// documentation by JMH
// @param  field   name of field on which to sort
// @param  reverse true to sort in natural (typically ascending) order, false to reverse sort
// @param  primer  function to perform on field to sort before sorting [optional]
// @return a sort function that is passed to the built-in JavaScript sort function,
//            thereby essentially passing the sort function a comparison function
var sort_by = function( field, reverse, primer ) {
  // pre-process the key to sort if desired
  var key = function( x ) { return primer ? primer( x[field] ) : x[field] } ;
  
  // set default sort order
  if ( typeof( reverse ) === "undefined" ) { reverse = true } ;
 
  // return a function that extracts the two keys to compare and sort on and then
  //    defines the comparison function on those two keys
  return function ( a, b ) {
    // extract and preprocess (optional) the two keys
    var A = key( a ) , 
        B = key( b ) ;
    // the following is the comparison function, with three cases:
    //   (1) A < B returns -1 times the result of the reverse computation (below)
    //   (2) A > B returns +1 times the result of the reverse computation (below)
    //   (3) A = B returns  0 times the result of the reverse computation (below)
    // the reverse computation
    //   (1) defines an array containing -1 and +1
    //   (2) since reverse can be anything (it does not have to be a Boolean),
    //          !reverse makes it true if it is not defined and false if it is
    //   (3) but since this is the reverse of what we want, !!reverse switches it
    //          so that it is false if it is not defined and true if it is
    //   (4) the + sign converts true or false to +1 or 0, respectively
    //   (5) this result is used as an index into the [-1,+1] array to return
    //          -1 or +1 as required 
    return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1,1][+!!reverse] ;
  }
}


// convert a Google time stamp string in "M/D/Y HH:MM:SS" format to a Date object
function timeStampToDateObject( str ) {
  var arr = str.split(/[\/ :]/) ;
  return new Date( arr[2], arr[0]-1, arr[1], arr[3], arr[4], arr[5] ) ;
}


// convert a Google time stamp string in "M/D/Y HH:MM:SS" format to 
//    a string in "Weekday, Month Day, Year at HH:MM AM|PM" format
function timeStampToDateAndTime( strTS ) {
  var dateTS = timeStampToDateObject( strTS ) ;
  var wmdy = DateObjectToWeekdayMonthDayYear( dateTS ) ;
  var ampmtime = jGetAMPMTime( dateTS )
  return wmdy + " at " + ampmtime ;
}


// set the target attribute of all anchor tags that do not have a target attribute to "_blank"
// N.B. requires jQuery
function SetAllUndefinedExternalLinkTargetsToBlank() {
  var k,  // loop index
      links = $("a:not([target])") ;
          // http://stackoverflow.com/questions/1969141/jquery-selectors-find-objects-without-specified-attribute
  // console.log( links.length ) ;
  for ( k = 0; k < links.length ; k++ ) {
    $(links[k]).attr( "target", "_blank" ) ;
        // the following code is not needed with the a:not selection
        // if ( $(links[k]).attr( "target" ) === undefined ) {
        // }
    // console.log( $(links[k]).attr( "target" ) ) ;
  }
  // console.log( $("a:not([target])").length ) ;
}

// set website icon - must be a 16x16 graphic
// convert GIF to ICO using XnView from http://www.xnview.com
document.writeln( '<link type="image/x-icon" href="/~heines/images/favicon.ico" rel="shortcut icon" />' ) ;
document.writeln( '<link type="image/x-icon" href="/~heines/images/favicon.ico" rel="icon" />' ) ;


// if accessing abraham.cs.uml.edu from other than a localhost (127.0.0.1), switch to 
//    teaching.cs.uml.edu
// console.log( "in JavaScript, the local IP address is:  <%= request.getRemoteAddr() %>" ) ;
if ( ( location.hostname === "abraham.cs.uml.edu" ||
       location.hostname === "lenovo.cs.uml.edu" ) && 
     "<%= request.getRemoteAddr() %>" !== "127.0.0.1" ) {
  window.location.replace( document.location.href.replace( "abraham", "teaching" ) ) ;
}
