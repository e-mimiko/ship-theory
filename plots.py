#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Apr 28 22:07:25 2026

@author: emimimiko
"""

import matplotlib.pyplot as plt
import mpld3
import pandas as pd
import seaborn as sns
import plotly.tools as tls


df = pd.read_csv("dataset/bl-pairings.csv")
print(df)

fig = plt.figure(figsize=(10, 6))
ax = fig.add_subplot(111) 
sns.countplot(x=df["production_house"], ax=ax)
plt.xticks(rotation=45)
plt.show()
mpld3.save_html(fig, "plot.html")




# fig, ax = plt.subplots()
# ax.plot([1, 2, 3], [4, 5, 6])

# Save directly to an HTML file
# mpld3.save_html(fig, "plot.html")



#plotly
# fig, ax = plt.subplots()
# ax.plot([1, 2, 3], [4, 5, 6])

# # Convert Matplotlib figure to Plotly figure
# plotly_fig = tls.mpl_to_plotly(fig)

# # Save as HTML
# plotly_fig.write_html("plotly_plot.html")



