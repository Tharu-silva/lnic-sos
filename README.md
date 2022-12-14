# lnic-sos

### GET

`/graph` Fetches the collection of nodes and relationships <mark>Working</mark><br><br>

`/graph/shortestpath?start=&end=` Fetches an array of nodes that make up the shortest path from one node to the other node <br><br>

`/node?id=`Fetches the node that corresponds to the id <br>
`/node/lables?label=` Fetches all nodes of the specified label <br>
`/node/properties?property=value` Fetches all nodes that matches the specified property <br><br>

`/relationship?id=` Fetches the node that corresponds to the id <br>
`/relationship/lables?label=` Fetches all relationships of a specific label <br>
<br><br>

`/subSys?id=` Fetches all the nodes in that node's subgroup/subsystem not including the central node PRIORITY<br><br>
`/system/central` Fetches all central nodes PRIORITY<br><br>

### POST

All POST requests return the created object 

`/node?property=&label=` Creates a node with the specified properties and label. <mark>Working</mark><br>
`relationship?start=&end=&type=` Creates a relationship with the specified start and end node and type <mark>Working</mark><br><br>

### PUT 

All PUT reqests return the updated object

`/node/properties?id=&property=` Alters an existing property of the specified node or adds that new property if it does not exist <br>
`/node/lables?id=&old=&new` Changes a replaces an existing label of the specified node with the new one <br><br>

`/relationship/properties?id=&property=` Alters an existing property of the specified node or adds that new property if it does not exist <br><br>

### DELETE

All DELETE requests return the deleted object

`/node?id=` Delete the specified node <br>
`/node/properties?id=&property1=` Deletes the specified property of the specified node <br>
`/node/lables?id=&label=` If Id is specified then it deletes the specified label of that node. If no id is specified then it deletes all nodes with that label<br><br>

`/relationship?id=&cascade=` Deletes the specified relationship. Deletes the nodes associated with that relationship if `cascade` is true <br>
`/relationship/properties?id=&property` Deletes the specified property of the specified relationship <br>
`/relationship/labels?label=` Deletes all relationships of the specified label<br><br>


