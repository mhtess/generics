# bootstrap generics model
import os
import sys
import pandas as pd

x = pd.read_csv('bootstrap_ddp_priors.csv',dtype='string',index_col=0)
print x