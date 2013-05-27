<?php

  // Creates an XML file from a html form called records_formatted.xml'
  // and then updates the xml file with new records.
 
  $appendRecordtoXML = simplexml_load_file('records.xml');
  
  if(empty($appendRecordtoXML)){
    
  // Creates the root element
  $records = new SimpleXMLElement('<record/>');

  // Creates the child elements 

    if(!empty($_POST['first_name']) && !empty($_POST['last_name']) && !empty($_POST['age'])){

      // Creates the parent element
      $player = $records -> addChild('player');

      // Creates the child elements the contain the players details

        foreach( $_POST as $key => $value){
            
            if($value == 'Send'){ continue; }
            
            $addVal = $player -> addChild($key); 
              $addVal -> {0} = $value;
        }

      var_dump($records);
      $records -> asXML('records.xml');
      
      $records_dom = new DOMDocument('1.0');
      $records_dom -> preserveWhiteSpace = false;
      $records_dom -> formatOutput = true;
         //returns a DOMElement
      $records_xml = dom_import_simplexml($records);
      $records_xml = $records_dom -> importNode($records_xml, true);
      $records_xml = $records_dom -> appendChild($records_xml);
      $records_dom -> save('records.xml');
      
    }
  } 
  else {
    
    $appendRecordtoXML = simplexml_load_file('records.xml');

    if(!empty($_POST['first_name']) && !empty($_POST['last_name']) && !empty($_POST['age'])){

      // Creates the parent element
      $player = $appendRecordtoXML -> addChild('player');

      // Creates the child elements the contain the players details

        foreach( $_POST as $key => $value){
            
            if($value == 'Send'){ continue; }
            
            $addVal = $player -> addChild($key); 
              $addVal -> {0} = $value;
        }

      var_dump($appendRecordtoXML);
      $appendRecordtoXML -> asXML('records.xml');

    }
             
  }
  
  if(!empty($appendRecordtoXML)){
        
        $records_dom = new DOMDocument('1.0');
        $records_dom -> preserveWhiteSpace = false;
        $records_dom -> formatOutput = true;
        // returns a DOMElement
        $records_xml = dom_import_simplexml($appendRecordtoXML);
        
        if(isset($records_xml)){ 
            $records_xml = $records_dom -> importNode($records_xml, true);
            $records_xml = $records_dom -> appendChild($records_xml);
            $records_dom -> save('records.xml');
        }           
  }

?>

