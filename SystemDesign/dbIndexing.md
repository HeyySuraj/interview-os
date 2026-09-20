

## Database Indexing 
DB Indexing makes data retrieval faster. 
Used B+ tree data structure 
Two type 
1. CLuster Index 
2. Non Cluster Index 
Cluster index sort the table in place.(Same memory location as a table)

Non cluster index create seperate sorted structure in different memory location .

1. Can not make more index because it make read fast but slow down the write, updated,  delete, craete operatoin. maintanalbe is slow.