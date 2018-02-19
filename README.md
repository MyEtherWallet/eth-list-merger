# eth-list-merger
simple tool to merge ethereum list from different sources 

# 

To get started:

Clone the Repository (including the submodules):
    git clone --recursive https://github.com/MyEtherWallet/ethereum-lists.git
    
Require ethListMerger.js and use the methods described below.


ethListMerger.js Static Methods:
(These will not work if called as instance method following new EthListMerger() )

#### mergeToEtherWallet(etherWalletPath, ethereumListPath)
    	 etherWalletPath -> the file path pointing to the content to merge into
    	 ethereumListPath -> the file path for content to be merged from
    	 
    	 Convienence method that encapsulates multiple steps to combine the two lists.
    	 Writes a local file containing the merged contents using the supplied file name as a suffix.  
    
#### mergeToEthereumLists(etherWalletPath, ethereumListPath)
        ethereumListPath -> the file path pointing to the content to merge into
        etherWalletPath -> the file path for content to be merged from
        
        Convienence method that encapsulates multiple steps to combine the two lists.                     	 
        Writes a local file containing the merged contents using the supplied file name as a suffix.  

#### merge(mergeInto, mergeFrom, mergeOn, compareProcessor)
        mergeInto -> the file path pointing to the content to merge into
        mergeFrom -> the file path for content to be merged from
        (Optional) mergeOn -> Property name on which to preform existence comparison for merge determination.  Defaults to using the address field.
        (Optional) compareProcessor -> function to act on the mergeOn value for comparison.  Defaults to comparing with all lower case and with leading/trailing spaces trimmed.
        
        Returns an array that contains the merged list.
                
#### getDifference(mergeInto, mergeFrom, mergeOn, compareProcessor)

        mergeInto -> the file path pointing to the content to merge into
        mergeFrom -> the file path for content to be merged from
        (Optional) mergeOn -> Property name on which to preform existence comparison for merge determination.  Defaults to using the address field.
        (Optional) compareProcessor -> function to act on the mergeOn value for comparison.  Defaults to comparing with all lower case and with leading/trailing spaces trimmed.
        
        Returns an array that contains those entries not present in the main/base list.

#### toEtherWalletFormat(valArray)
        valArray -> array of token entries to be formatted to conform to the format found in etherWallet token files.
        
        returns an array containing the supplied content, but formatted to match that found in the etherWallet token files.
    

#### toEthereumListFormat
        valArray -> array of token entries to be formatted to conform to the format found in Ethereum-List token files.
        
        returns an array containing the supplied content, but formatted to match that found in the Ethereum-List token files.

#### toFile(filename, result)
        Convience method to write merged result to file
        filename -> the file name to use
        result -> the merge results to write to the file.
    

### See example.js for some usage examples
