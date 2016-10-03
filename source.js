// *   = done
// ?   = maybe add in?
// &   = in progress
// ➡ ⬇ = return

// fn conventions
// _arr, fldr, fldrI

// * | General 
// * | - Array
// * | -- Check for a Value
// * | -- Remove Duplicates
// * | -- Remove Empty Values
// * | -- Get Count of Values in Array
// * | - Array of Objects
// * | -- Sort by Property or Properties
// * | -- Find Object With Unique Property Value - Return Object
// * | -- Find Object With Unique Property Value - Return Value 
// * | -- Filter by Property Value
// * | - Dates and Times
// * | -- Formatted Timestamps
// * | -- Match a Date to a Range of Dates
//   |  Drive 
//   | - Folders
//   | -- Create or Verify Folder Path
//   | -- Get Id of Last Folder in Folder Path
//   | -- Create or Verify Folder(s) in Folder or at Root
//   | -- Array of All Folders in Path / Id / Obj / Root / Drive
//   | -- Array of All Folder Names for Array of Folder Objects
//   | -- Search for Folder(s) in Path / Id / Obj / Root / Drive
//   | - Files
//   | -- Array of All Files in a Folder / Root / Drive
//   | -- Array of All File Names for Array of Files
//   | -- Search for a File - Path / Obj / Id / All of Drive
//   | -- Move a File to a Folder - Path / Obj / Id
//   | -- Copy a File to a Folder - Path / Obj / Id
//   | Sheets
//   | - Utility Functions for Sheets
//   | -- Convert Column Number to a Letter
//   | -- Timestamp on Cell Change
//   | -- Replicating Import Range
//   | -- Evaluating True and False
//   | - Range as Array of Objects - Grid
//   | -- New Grid from Sheet
//   | -- New Grid from Range
//   | -- Set Values in Grid
//   | - Range as Array of Objects - Generic
//   | -- Set Values from an Array of Objects to Range
//   | -- Generate Array of Objects
//   | - Range as Array of Arrays
//   | -- Generate Array of Arrays
//   | -- Flatten A Multidimensional Array
//   | Forms
//   | - Form Management
//   | -- Build Array of Items
//   | -- Set Item Dropdown Choices
//   | -- Clear All Form Options
//   | -- Get Destination Sheet
//   | - Form Responses
//   | -- Get Last Form Response
//   | -- Dates in Form Responses
//   | Docs
//   | - Utility Functions for Docs
//   | -- Clear All Content From a Doc
//   | Gmail
//   | - Send Email
//   | -- Comma Separated List of Recipients
//   | -- HTML in Email Body

function testEverything() {}

// General

// - Array 

// -- Check for a Value
// ➡  bool

function checkValIn(arr, val) { 
  return arr.indexOf(val) > -1; 
}

// var arr1 = [1,2,3,4];

// if (checkValIn(arr1, 99)) {
//     Logger.log("value check ➡ 99 is in the array"); 
//   } else {
//     Logger.log("value check ➡ 99 is not in the array");
// }

// -- Remove Duplicates 
// ➡  arr

function rmDuplicatesFrom(arr) {
  var check  = {};
  var output = [];
  var j = 0;
  for(var i = 0; i < arr.length; i++) {
       var item = arr[i];
       if(check[item] !== 1) {
             check[item] = 1;
             output[j++] = item;
       }
  }
  return output;
}

// var arr2  = [1,2,3,1,2,3,4,];
// var ex_rd = rmDuplicatesFrom(arr2);
// Logger.log("rmDup input ➡ " + arr2);
// Logger.log("rmDup output ➡ " + ex_rd);

// -- Remove Empty Values
// ➡  arr

function rmEmptyVal(x){
  return (x !== (undefined || ''));
}

// var arr3  = ["a",,"b",,,"c"];
// var ex_re = arr3.filter(rmEmptyVal);
// Logger.log("rmEmpty input ➡ " + arr3);
// Logger.log("rmEmpty output ➡ " + ex_re);

// -- Get Count of Values in Array
// ➡  arrObj

function countOfValIn(arr){
  var comp = [];
  var copy = arr.slice(0);
	for (var i = 0; i < arr.length; i++) {
		var myCount = 0;	
		for (var w = 0; w < copy.length; w++) {
			if (arr[i] == copy[w]) {
				myCount++;
				delete copy[w];
			}
		}
		if (myCount > 0) {
			var a = new Object();
			a.value = arr[i];
			a.count = myCount;
			comp.push(a);
		}
	}
  return comp;
}

// var arr4  = ["A", "B", "C", "A", "B", "C", "D", "A"];
// var ex_cv = countOfValIn(arr4);
// Logger.log("countVal input ➡ " + arr4);
// Logger.log("countVal out ⬇ ");
// Logger.log(ex_cv);

// - Array of Objects

// example arrObj

var ex_arrObj = [
  {a: 1000, b: 1, c: 5}, 
  {a: 10000, b: 2, c: 5000}, 
  {a: 10, b: 2, c: 500},
  {a: 1, b: 1, c: 50}
]

// -- Sort by Property or Properties
// ➡  arrObj

function dynSort(prop) {
  var sortOrder = 1;
  if(prop[0] === "-") {
    sortOrder = -1;
    prop = prop.substr(1);
  }
    return function (a,b) {
    var result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
    return result * sortOrder;
  }
}

// ex_arrObj.sort(dynSort("a"));
// Logger.log("arrObj sorted by 'a' value ⬇ ");
// Logger.log(ex_arrObj);

function dynSortM() {
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0, result = 0, numberOfProperties = props.length;
    while(result === 0 && i < numberOfProperties) {
      result = dynSort(props[i])(obj1, obj2);
      i++;
    }
      return result;
  }
}

// ex_arrObj.sort(dynSortM("b", "c"));
// Logger.log("arrObj sorted by 'b' and 'c' values ⬇ ");
// Logger.log(ex_arrObj);

// -- Find Object With Unique Property Value - Return Object
// ➡  obj 

function findObjIn(arrObj, pQuery, val) {
  for (var i = 0; i < arrObj.length; i++) {
    var obj = arrObj[i];
    for (var prop in obj) {
      if (obj.hasOwnProperty(pQuery)) {
        if (prop == pQuery) {
          if (obj[prop] == val) {
          return obj;
          }
        }
      }
    }
  }
}

// Logger.log("find obj with 'a' value of 1000 ⬇ ");
// var ex_foi = findObjIn(ex_arrObj, "a", 1000);
// Logger.log(ex_foi);

// -- Find Object With Unique Property Value - Return Value 
// ➡  val 

function findObjValIn(arrObj, pQuery, val, pReturn) {
  for (var i = 0; i < arrObj.length; i++) {
    var obj = arrObj[i];
    for (var prop in obj) {
      if (obj.hasOwnProperty(pQuery)) {
        if (prop == pQuery) {
          if (obj[prop] == val) {
          return obj[pReturn];
          }
        }
      }
    }
  }
}

// Logger.log("find obj with 'c' value of 500 and return its 'a' value ⬇ ");
// var ex_fovi = findObjValIn(ex_arrObj, "c", 500, "a");
// Logger.log(ex_fovi);

// -- Filter by Property Value
// ➡  arrObj

function filterObjIn(arrObj, pQuery, val) {
  var array = [];
  for (var i=0; i < arrObj.length; i++) {
    if (arrObj[i][pQuery] == val) array.push(arrObj[i]);
  }
  return array;
}

// var ex_foi = filterObjIn(ex_arrObj, "b", 2);
// Logger.log("filter arrObjs with 'b' value of 2 ⬇ ");
// Logger.log(ex_foi);

// - Dates and Times

// -- Formatted Timestamps 
// ➡  string

function fmatD() {
  var n = new Date();
  var d = [ n.getMonth() + 1, n.getDate(), n.getYear() ]
  return d.join("/");
}

// var ex_fd = fmatD();
// Logger.log("current date ➡ " + ex_fd);

function fmat24T(){
  var n  = new Date();
  var t = [ n.getHours(), n.getMinutes(), n.getSeconds() ]
  for ( var i = 1; i < 3; i++ ) {
    if ( t[i] < 10 ) {
      t[i] = "0" + t[i];
    }
  return t.join(":");
  }
}

// var ex_24T = fmat24T();
// Logger.log("current time (24 hour) ➡ " + ex_24T);

function fmat12DT() {
  var n = new Date();
  var d = [ n.getMonth() + 1, n.getDate(), n.getYear() ]
  var t = [ n.getHours(), n.getMinutes(), n.getSeconds() ]
  var s = ( t[0] < 12 ) ? "AM" : "PM";
  t[0]  = ( t[0] <= 12 ) ? t[0] : t[0] - 12;
  for ( var i = 1; i < 3; i++ ) {
    if ( t[i] < 10 ) {
      t[i] = "0" + t[i];
    }
  }
  return d.join("/") + " " + t.join(":") + " " + s;
}

// var ex_dt12 = fmat12DT();
// Logger.log("current date + time (12 hour) ➡ " + ex_dt12);

// -- Match a Date to a Range of Dates

var quarterDates = [
  ["08/01/2016", "10/28/2016"],
  ["11/02/2016", "1/9/2017"],
  ["1/15/2017", "3/19/2017"],
  ["3/21/2017", "6/15/2017"],
  ];

function academicQuarter() {
  var d = new Date();
  for (i = 0; i < 4; i++){
  var s = new Date(quarterDates[i][0]);
  var e = new Date(quarterDates[i][1]);
  if (d >= s && d <= e ) {
    var q =  i + 1;
    } 
  }
  if (q) { return q } else { return "date outside of academic calendar"}
}

// var acdQ = academicQuarter();
// Logger.log("current quarter ➡ " + acdQ);

// Drive

// - Folders

// -- Create or Verify Folder Path
// ➡  id of last folder in folder path

function createOrVerify(fPath) {
  var array = fPath.split('/');
  var f;
  for (i = 0; i < array.length; i++) {
    if (i == 0) {
      var fi = DriveApp.getRootFolder().getFoldersByName(array[i]);
      if(!(fi.hasNext())) {
        DriveApp.createFolder(array[i]);
        fi = DriveApp.getFoldersByName(array[i]);
        } 
      f = fi.next();
      } else if (i >= 1) {
        fi = f.getFoldersByName(array[i]);
        if(!(fi.hasNext())) {
          f.createFolder(array[i]);
          fi = DriveApp.getFoldersByName(array[i]);
        } 
        f = fi.next();
      }
  } 
  var fId = f.getId();
  return fId;
}

// var ex_cvfp = createOrVerify("google-apps-script-cheat-sheet/A/B/C");
// Logger.log("Id of 'C' in 'google-apps-script-cheat-sheet/A/B/C' is ➡ " + ex_cvfp);

// -- Get Id of Last Folder in Folder Path
// ➡  id of last folder in folder path

function idOfLastFolderIn(fPath) {
  var array = fPath.split('/');
  var f;
  for (i = 0; i < array.length; i++) {
    if (i == 0) {
      var fi = DriveApp.getRootFolder().getFoldersByName(array[i]);
      if(fi.hasNext()) {f = fi.next();} else { return null;}
    } else if (i >= 1) {
        fi = f.getFoldersByName(array[i]);
        if(fi.hasNext()) {f = fi.next();} else { return null;}
      }
  } 
  var fId = f.getId();
  return fId;
}

// var ex_idlf = idOfLastFolderIn("google-apps-script-cheat-sheet/A/B/C");
// Logger.log("Id of 'C' in 'google-apps-script-cheat-sheet/A/B/C' is ➡ " + ex_idlf);

// -- Create or Verify Folder(s) in a Folder
// ➡  id of last folder in folder path

function createFoldersAt(fPath, arrFldrNames) {
    var destination = DriveApp.getFolderById(createOrVerify(fPath));
    var destinationFolders = allFoldersIn(fPath);
    for (i=0; i < arrFldrNames.length; i++) {
      if (!(checkValIn(destinationFolders, arrFldrNames[i]))) {
        destination.createFolder(arrFldrNames[i]);
      }
    }
  return destination.getId();
}

// var ex_af1 = ["X", "Y", "Z"];
// var ex_cfa = createFoldersAt("google-apps-script-cheat-sheet", ex_af1);
// Logger.log("all folders in 'google-apps-script-cheat-sheet' = AXYZ ⬇ ");
// Logger.log(allFoldersIn("google-apps-script-cheat-sheet"));

// -- Create or Verify Folder(s) at Root
// ➡  id of root folder

function createFoldersAtRoot(arrFldrNames) {
    var rootFolders = allRootFolders();
    for (i=0; i < arrFldrNames.length; i++) {
      if (!(checkValIn(rootFolders, arrFldrNames[i]))) {
        DriveApp.createFolder(arrFldrNames[i]);
      }
    } 
    return DriveApp.getRootFolder().getId();
}

// var ex_af2 = ["1", "2", "3"];
// var ex_cfa = createFoldersAtRoot(ex_af2);
// Logger.log("all folders at Root ⬇ ");
// Logger.log(allRootFolders());

// -- Array of All Folders in Path / Obj / Id / Root / Drive
// ➡  arr of fldrObjs

// --- All Folders at the End of a File Path

function allFoldersInPath(fPath) {
  var fldrObj = DriveApp.getFolderById(idOfLastFolderIn(fPath));
  var fldrI   = fldrObj.getFolders();
  var _arr    = [];
  while (fldrI.hasNext()) {
    var fldr = fldrI.next();
   _arr.push(fldr);
  } 
  return _arr;
}

// var ex_afip = allFoldersInPath("google-apps-script-cheat-sheet");
// Logger.log("'google-apps-script-cheat-sheet' has top level folders ➡ " + ex_afip);

// --- All Folders in Folder By Id

function allFoldersInId(fId) {
  var fldrObj = DriveApp.getFolderById(fId);
  var fldrI   = fldrObj.getFolders();
  var _arr    = [];
  while (fldrI.hasNext()) {
    var fldr = fldrI.next();
   _arr.push(fldr);
  } 
  return _arr;
}

// var gascs_id = idOfLastFolderIn("google-apps-script-cheat-sheet");
// var ex_afii  = allFoldersInId(gascs_id);
// Logger.log("'google-apps-script-cheat-sheet' has top level folders ➡ " + ex_afii);

// --- All Folders in Folder Obj

function allFoldersInObj(fObj) {
  var fldrI   = fObj.getFolders();
  var _arr    = [];
  while (fldrI.hasNext()) {
    var fldr = fldrI.next();
   _arr.push(fldr);
  } 
  return _arr;
}

// var gascs_obj = DriveApp.getFolderById(gascs_id)
// var ex_afio   = allFoldersInObj(gascs_obj);
// Logger.log("'google-apps-script-cheat-sheet' has top level folders ➡ " + ex_afio);

// --- All Root Level Folders

function allRootFolders() {
  var rootFolder = DriveApp.getRootFolder();
  var fldrI      = rootFolder.getFolders();
  var _arr       = [];
  while (fldrI.hasNext()) {
    var fldr = fldrI.next();
   _arr.push(fldr);
  } 
  return _arr;
}

// var ex_rf = allRootFolders();
// Logger.log("all root folders ⬇ ");
// Logger.log(ex_rf);

// --- All Folders in Drive

function allFoldersInDrive() {
  var fldrI = DriveApp.getFolders();
  var _arr  = [];
  while (fldrI.hasNext()) {
    var fldr = fldrI.next();
   _arr.push(fldr);
  } 
  return _arr;
}

// var ex_af = allFoldersInDrive();
// Logger.log("all folders in Drive ⬇ ");
// Logger.log(ex_af);

// -- Array of All Folder Names for Array of Folder Objects
// ➡  arr folder names

function getFolderNames(arrFldrObj) {
  var _arr = [];
  for (var i = 0; i < arrFldrObj.length; i++) {
    var fldrName = arrFldrObj[i].getName();
    _arr.push(fldrName);
  }
  return _arr;
}

// var ex_gfn = getFolderNames(ex_rf);
// var test1  = checkValIn(ex_rf, "google-apps-script-cheat-sheet");
// var test2  = checkValIn(ex_gfn, "google-apps-script-cheat-sheet");
// Logger.log("check for 'google-apps-script-cheat-sheet' in arrFldrObj ➡ " + test1);
// Logger.log("check for 'google-apps-script-cheat-sheet' in arrFldrNames ➡ " + test2);

// -- Search for Folder(s) in Path / Id / Obj / Root / Drive
// ➡  id of folder or arr of matching folders

// --- Search a Folder Path for a Folder or Folders

function findFolderInPath(fPath, fName) {
  var fldrId = idOfLastFolderIn(fPath);
  if (fldrId) {
    var fldrObj      = DriveApp.getFolderById(fldrId);
    var arrFldrObj   = allFoldersInObj(fldrObj);
    var arrFldrNames = getFolderNames(arrFldrObj);
    if (checkValIn(arrFldrNames, fName)) {
      var fldrIdRet = fldrObj.getFoldersByName(fName).next().getId();
      return fldrIdRet;
    }
  } else {
    return null;
  }
}

var ex_ffip = findFolderInPath("google-apps-script-cheat-sheet", "A");
Logger.log(" Id of 'A' in 'google-apps-script-cheat-sheet' is ➡ " + ex_ffip);

// --- Access a Folder by Id and Search for a Folder or Folders

function findFolderInId(fId, fName) {
  var fldrObj = DriveApp.getFolderById(fId);
  if (fldrObj) {
    var arrFldrObj   = allFoldersInObj(fldrObj);
    var arrFldrNames = getFolderNames(arrFldrObj);
    if (checkValIn(arrFldrNames, fName)) {
      var fldrIdRet = fldrObj.getFoldersByName(fName).next().getId();
      return fldrIdRet;
    }
  } else {
    return null;
  }
}

var ex_fid = idOfLastFolderIn("google-apps-script-cheat-sheet");
var ex_ffii = findFolderInId(ex_fid, "A");
Logger.log(" Id of 'A' in 'google-apps-script-cheat-sheet' is ➡ " + ex_ffii);

// --- Search a Folder Object for a Folder or Folders

function findFolderInObj(fObj, fName) {
  var idOfLastFolder  = idOfLastFolderIn(fPath);
  if (idOfLastFolder) {
    var lastFolder    = DriveApp.getFolderById(idOfLastFolder);
    var folderContent = allFoldersIn(fPath);
    if (checkValIn(folderContent, fName)) {
      var folderId = lastFolder.getFoldersByName(fName).next().getId();
      return folderId;
    }
  } else {
    return null;
  }
}

// var ex_ffi = findFolderIn("JCodesMN/A/B", "C");
// Logger.log(" Id of 'C' in 'JCodesMN/A/B/C' is ➡ " + ex_ffi);

// --- Search Drive for a Folder or Folders

function searchDriveForFolder(fName) {
  var arr = [];
  var fi  = DriveApp.getFoldersByName(fName);
  while (fi.hasNext()) {
   var fldr = fi.next();
   arr.push(fldr);
 }
  if (arr.length == 1) {
    return arr[0].getId();
  } else {
    return arr;
  }
}

// var ex_fldrid = searchDriveForFolder("JCodesMN");
// Logger.log(" Id of 'JCodesMN' at root ➡ " + ex_fldrid);



//////////////////////////////////////////////////







// fn to create scratch file for examples below

function checkForExFile() {
  createOrVerify("JCodesMN");
  var jcmnf = DriveApp.getFolderById(searchDriveForFolder("JCodesMN"));
  var files = jcmnf.getFilesByName("JCodesMN_exFile");
  var exFile;
  while (files.hasNext()) {
    exFile = files.next();
  }
  if (!(exFile)){jcmnf.createFile("JCodesMN_exFile", "Hello, world!");}
}

checkForExFile();

// - Files

// -- Array of All Files in a Folder / Drive / Root

function allFilesIn(fPath) {
  var fldrObj = DriveApp.getFolderById(idOfLastFolderIn(fPath));
  if (fldrObj) {
    var fileI = fldrObj.getFiles();
    var _arr  = [];
    while (fileI.hasNext()) {
      var file = fileI.next().getName();
     _arr.push(file);
    } 
    return _arr;
  } else {
    return null;
  }
}

// var ex_afi = allFilesIn("JCodesMN");
// Logger.log(ex_afi);

function allRootFiles() {
  var rFldr = DriveApp.getRootFolder();
  var fileI = rFldr.getFiles();
  var _arr = [];
  while (fileI.hasNext()) {
    var file = fileI.next().getName();
   _arr.push(file);
  } 
  return _arr;
}

// var ex_arf = allRootFiles();
// Logger.log(ex_arf);

function allFilesInDrive() {
  var fileI = DriveApp.getFiles();
  var _arr  = [];
  while (fileI.hasNext()) {
    var file = fileI.next().getName();
   _arr.push(file);
  } 
  return _arr;
}

// var ex_afid = allFilesInDrive();
// Logger.log(ex_afid);

// -- Search a Folder for a File
// ➡  id of file or arr of matching files

function searchFolderForFile(fPath, fName) {
  var fldr = DriveApp.getFolderById(idOfLastFolderIn(fPath));

}

// -- Search Root for a File
// ➡  id of file or arr of matching files

function searchRootForFile(fName) {

}

// -- Search Drive for a File
// ➡  id of file or arr of matching files

function searchDriveForFile(fName) {
  var arr = [];
  var fi  = DriveApp.getFilesByName(fName);
  while (fi.hasNext()) {
   var fldr = fi.next();
   arr.push(fldr);
 }
  if (arr.length == 1) {
    return arr[0].getId();
  } else {
    return arr;
  }
}

var ex_fileid = searchDriveForFile("JCodesMN_exFile");
// Logger.log(" Id of 'JCodesMN_exFile' ➡ " + ex_fileid);

// -- Move a File to a Folder
// ➡  id of newly created file 

function moveFileById(fileId, folderId) {
	var sFile     = DriveApp.getFileById(fileId);
  var sFileName = sFile.getName();
  var fldr      = DriveApp.getFolderById(folderId);
  var oFile     = sFile.makeCopy(sFileName, fldr);
  var oFileId   = outputFile.getId();
  if (outputFileId !== "") {
    DriveApp.getFileById(sFileId).setTrashed(true);
  }
  return oFileId;
}

function moveFileByObj(fileObj, folderObj) {

}

function moveFileByPath(oPath, dPath) {

}

// -- Copy a File to a Folder
// ➡  id of newly created file 

function copyFileById(fileId, folderId) {
	var sFile     = DriveApp.getFileById(fileId);
  var sFileName = sFile.getName();
  var fldr      = DriveApp.getFolderById(folderId);
  var oFile     = sFile.makeCopy(sFileName, fldr);
  var oFileId   = outputFile.getId();
  return oFileId;
}

// copyFileByObjs(fileObj, folderObj) {}

// copyFileByPath(oPath, dPath) {}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Sheets

// - Utility Functions for Sheets - [ ] 

// -- Convert Column Number to a Letter - [ ] 

// -- Timestamp on Cell Change - [ ] 

// - Arrays and Ranges - [ ] 

// -- Evaluating User Input as True or False - [ ] 

// -- Generate Array of Arrays by Row - [ ] 

// -- Remove Duplicates from an Array - [ ] 

// -- Remove Empty Values from an Array - [ ] 

// -- Vlookup in Google Script - [ ] 

// -- Flatten Multidimensional Array for One Row - [ ] 

// -- Flatten Multidimensional Array for One Column - [ ] 

//////////
// Docs //
//////////

// - Utility Functions for Docs - [ ]  

// createOrVerifyDocIn(folderPath, docName)
function makeOrFindDocInFolderPathReturnId() {
  var folderId = createOrFindFolderPathReturnId(exportFolder);
  var folder   = DriveApp.getFolderById(folderId);
  var docName  = generateDocName();
  var docCheck = folder.getFilesByName(docName);
  if (docCheck.hasNext()) {
      var file = docCheck.next(); 
      return file.getId();
    } else {
      var docId       = makeDocReturnId(docName);
      var outputDocId = copyFileDeleteSourceReturnNewId(docId, folderId);
      return outputDocId;
   }
}

// -- Create a Blank Doc in a Folder
function createDocIn(folderId, docName) {
  var folder    = DriveApp.getFolderById(folderId);
  var inputDoc  = DocumentApp.create(docName);
  var outputDoc = inputDoc.makeCopy(docName, folder);
  var docCheck = folder.getFilesByName(docName);
  if (docCheck.hasNext()) {
    var outputDocId = docCheck.next().getId();
    DriveApp.inputDoc.setTrashed(true);
    }
}

// -- Clear All Content From a Doc - [ ] 

////////////////////////////////////////////
////////////////////////////////////////////

function createArrayOfObjectsFromRange_Vertical(sheetName, a1Notation) {
  var range      = ss.getSheetByName(sheetName).getRange(a1Notation);
  var height     = range.getHeight();
  var width      = range.getWidth();
  var values     = range.getValues();
  var properties = [];
  for (var i = 0; i < values.length; i++) {
    properties.push(values[i][0]);
  } 
  var arrayOfObjects = [];

  for (var i = 0; i < height; i++) {
    var obj = new Object();
    for (var j = 1; j < width; j++) {
      var property  = properties[i];
      var value     = values[i][j];
      // skip empty values 
      if (value !== "") {
        obj[property] = value;
      }
    }
    // don't add empty objects to the array
    var count = 0;
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            count++;
        }
      }
    if (count >= 1) {
      arrayOfObjects.push(obj);
    } 
  }  
  return arrayOfObjects;
}


// horizontal
function range_ArrayOfObjects(sheetName, a1Notation){

  var range  = SpreadsheetApp.getActive().getSheetByName(sheetName).getRange(a1Notation);
  var height = range.getHeight();
  var width  = range.getWidth();
  var values = range.getValues();

  var headers = [];
  for (var i = 0; i < values[0].length; i++) {
    headers.push(values[0][i])
  } 

  var arrayOfObjects = [];

  for (var i = 1; i < height; i++) {
    var obj = new Object();

    for (var j = 0; j < width; j++) {
      var property  = headers[j];
      var value     = values[i][j];
      // pass over empty values 
      if (value !== "") {
        obj[property] = value;
      }

    }
      var count = 0;
      for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
              count++;
          }
        }

      if (count >= 1) {
        arrayOfObjects.push(obj);
      } 
  }  
  return arrayOfObjects;
}


// doesn't work in onEdit(e)
function getSetValues(sheet1, a1Notation1, sheet2, a1Notation2) {
  var get = ss.getSheetByName(sheet1).getRange(a1Notation1).getValues();
  var set = ss.getSheetByName(sheet2).getRange(a1Notation2).setValues();
} 


// have to go through DriveApp to copy files / folders ->

function createABlankDocInAFolder(folderId, docName) {
  var folder       = DriveApp.getFolderById(folderId);
  var inputDocId   = DocumentApp.create(docName).getId();
  var inputDocFile = DriveApp.getFileById(inputDocId);
  var outputDoc    = inputDocFile.makeCopy(docName, folder);
  var docCheck     = folder.getFilesByName(docName);
  if (docCheck.hasNext()) {
    var outputDocId = docCheck.next().getId();
    inputDocFile.setTrashed(true);
    return outputDocId;
    }
}

// number of unique values for a property in array of objects

function countValuesForProperty(arrayOfObjects, property) {
  for (var i = 0; i < arrayOfObjects.length; i++) {
      
  } 
}


// gets all values for array of objects

// var result = objArray.map(function(a) {return a.foo;});

// function onlyUnique(value, index, self) { 
//       return self.indexOf(value) === index;
// }

// Logger.log(val.indexOf("Last"));

// var index = val.map(function(e) { return e.Last; }).indexOf('ZZZ');

function uniqueValuesForProperty(arrayOfObjects, property) {
  var allValues    = arrayOfObjects.map(function(a) {return a.property;});
  var uniqueValues = removeDuplicates(allValues);
  return uniqueValues;
}


// ---

function newArrayByObjProp(arrayOfObj, propToFind) {
  var array = [];
  for (var i = 0; i < arrayOfObj.length; i++) { 
  var obj = arrayOfObj[i];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop == propToFind) {
          array.push(obj[prop]);
        }
      }
    }
  }
  return array;
}


function compressArray(original) {
 
	var compressed = [];
	var copy       = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};

// function buildArrayOfItemsByTitle(formObj) {
//   var output_array = [];
//   var arrayOfItemObjects = formObj.getItems()
//   for (var i = 0; i < arrayOfItemObjects.length; i++) {
//     output_array.push(arrayOfItemObjects[i].getTitle());
//   }
//   return output_array;
// }

// RegEx -> non-digits
// myString = myString.replace(/\D/g,'');

// RegEx -> digits only
// myString = myString.replace(/\d+/g)


// like a vlookup, but works for any property in the row
// change arrayOfObject build code to include index value and sheet

function buildArrayOfObjectsForSheet(sheetObj, headerRow) {
  // assumed to be one, but it could start lower
  // add properties to each rowObj: rowNumber, sheet, headerRow
}

function buildArrayOfHeaders(sheetObj, headerRow) {

}

function getObjectMatchingUniquePropertyValue(arrayOfObjects, property, value) {

}

function buildArrayOfObjectsForProperty(arrayOfObjects, property, value) {

}

function buildArrayOfHeaders(sheetObj, rowPosition) {
  // won't match property count of object (off by 3?)
}

// new pvPair?

function setCellValueOrValues(rowObj, property, value) {
  // if (opt_headerRowNumber == nil) -> opt_headerRowNumber = 1
  // will be able to get rowObj.sheet + rowObj.row
  // var sheet  = rowObj.sheet
  // var arrayOfHeaders = buildArrayOfHeadrers(
  // var row    = rowObj.row;
  // var cell   = 

  // is there someway to halt execution and batch process changes?

}


// in typical run, only one object would have "" value for 'Complete?' column

// ---

function setCellValue(sheet, queryHeader, queryValue, header, value) {
  // build array of all column headers, find position of columnValue and convert to A1
  // build array of objects for sheet -> build array of from all row values
}

function getColumnIndexForValue(sheet, value) {

}

// PULLED FROM HW FORM SCRIPT.JS


// function returnFirstMatch(obj, arrProp){
//   for (var i = 0; i < arrProp.length; i++) {
//     for (var prop in obj) {
//       if (obj.hasOwnProperty(prop)){
//         if (prop == arrProp[i]){
//           if (obj[prop] != "") {
//             return obj[prop];
//           }
//         }
//       }
//     }
//   }
// }

// JUNK?

// function setUnifiedDate(arrObj){
//   for (var h = 0; h < arrObj.length; h++){
//     var item = arrObj[h];
//       for (var prop in item) {
//         if (item.hasOwnProperty(prop)){
//           if (prop == "Due Date"){
//             item["Unified Date"] = item[prop];
//             continue;
//           } else {
//             item["Unified Date"] = item["Timestamp"];
//           }
//         }
//     }
//   }
//   return arrObj;
// }

// FORM OPTIONS

function buildArrayOfItemTitleID(formObj) {
  var output_array = [];
  var arrayOfItemObjects = formObj.getItems()
  for (var i = 0; i < arrayOfItemObjects.length; i++) {
    var item = {}; 
    item.index = i;
    item.title = arrayOfItemObjects[i].getTitle();
    item.id    = arrayOfItemObjects[i].getId();
    item.item  = arrayOfItemObjects[i];
    output_array.push(item);
  }
  return output_array;
}

function buildArrayOfChoices(itemObject, inputArray) {
  var arrayOfChoices = [];
  for (var i = 0; i < inputArray.length; i++){
    var response = itemObject.createChoice(inputArray[i]);
    Logger.log(response);
    // arrayOfChoices.push(response);
  }
  // return arrayOfChoices ;
}
