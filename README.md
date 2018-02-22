# eth-list-merger
simple tool to merge ethereum list from different sources 

# 

To get started:

Clone the Repository (including the submodules):\
    ```git clone --recursive https://github.com/MyEtherWallet/eth-list-merger.git```
    
Require ethListMerger.js and use the methods described below.


ethListMerger.js Static Methods:
(These will not work if called as instance method following new EthListMerger() )

<dl>
    <dt>mergeToEtherWallet(etherWalletPath, ethereumListPath)</dt>
<dd>etherWalletPath -> the file path pointing to the content to merge into</dd>
<dd>ethereumListPath -> the file path for content to be merged from</dd>
    	 
<dd>Convienence method that encapsulates multiple steps to combine the two lists.</dd>
<dd>Writes a local file containing the merged contents using the supplied file name as a suffix.</dd>

<dt>mergeToEthereumLists(etherWalletPath, ethereumListPath)</dt>
<dd>ethereumListPath -> the file path pointing to the content to merge into</dd>
<dd>etherWalletPath -> the file path for content to be merged from</dd>
<dd>Convienence method that encapsulates multiple steps to combine the two lists.</dd>                     	 
<dd>Writes a local file containing the merged contents using the supplied file name as a suffix.</dd>

<dt>merge(mergeInto, mergeFrom, mergeOn, compareProcessor)</dt>
<dd>mergeInto -> the file path pointing to the content to merge into</dd>
<dd>mergeFrom -> the file path for content to be merged from</dd>
<dd>(Optional) mergeOn -> Property name on which to preform existence comparison for merge determination.  Defaults to using the address field.</dd>
<dd>(Optional) compareProcessor -> function to act on the mergeOn value for comparison.  Defaults to comparing with all lower case and with leading/trailing spaces trimmed.</dd>
<dd>Returns an array that contains the merged list.</dd>
                
<dt>getDifference(mergeInto, mergeFrom, mergeOn, compareProcessor)</dt>

<dd>mergeInto -> the file path pointing to the content to merge into</dd>
<dd>mergeFrom -> the file path for content to be merged from</dd>
<dd>(Optional) mergeOn -> Property name on which to preform existence comparison for merge determination.  Defaults to using the address field.</dd>
<dd>(Optional) compareProcessor -> function to act on the mergeOn value for comparison.  Defaults to comparing with all lower case and with leading/trailing spaces trimmed.</dd>
        
<dd>Returns an array that contains those entries not present in the main/base list.</dd>

<dt>toEtherWalletFormat(valArray)</dt>
<dd>valArray -> array of token entries to be formatted to conform to the format found in etherWallet token files.</dd>  
<dd>returns an array containing the supplied content, but formatted to match that found in the etherWallet token files.</dd>
    

<dt>toEthereumListFormat</dt>
<dd>valArray -> array of token entries to be formatted to conform to the format found in Ethereum-List token files.</dd>
        
<dd>returns an array containing the supplied content, but formatted to match that found in the Ethereum-List token files.</dd>

<dt>toFile(filename, result)</dt>
<dd>Convience method to write merged result to file</dd>
<dd>filename -> the file name to use</dd>
<dd>result -> the merge results to write to the file.</dd>
</dl>

### See example.js for some usage examples
