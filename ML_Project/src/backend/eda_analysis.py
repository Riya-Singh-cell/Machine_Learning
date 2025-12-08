import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ================================
# LOAD DATASET
# ================================
df = pd.read_csv("stress_data.csv")

print("\n Dataset Loaded Successfully")
print(df.head())

# ================================
# BASIC DATA INFO
# ================================
print("\n Dataset Shape:", df.shape)
print("\n Dataset Info:")
print(df.info())

# ================================
#  MISSING VALUE ANALYSIS
# ================================
print("\n Missing Values:\n", df.isnull().sum())

# ================================
#  STATISTICAL SUMMARY
# ================================
print("\n Statistical Summary:\n", df.describe())

# ================================
# DISTRIBUTION OF FEATURES
# ================================
plt.figure()
sns.histplot(df["sleep"], kde=True)
plt.title("Sleep Distribution")
plt.show()

plt.figure()
sns.histplot(df["work"], kde=True)
plt.title("Work Hours Distribution")
plt.show()

plt.figure()
sns.histplot(df["mood"], kde=True)
plt.title("Mood Distribution")
plt.show()

plt.figure()
sns.histplot(df["social"], kde=True)
plt.title("Social Interaction Distribution")
plt.show()

# ================================
# OUTLIER DETECTION (BOXPLOTS)
# ================================
plt.figure()
sns.boxplot(x=df["sleep"])
plt.title("Sleep Outliers")
plt.show()

plt.figure()
sns.boxplot(x=df["work"])
plt.title("Work Outliers")
plt.show()

# ================================
# CORRELATION MATRIX
# ================================
plt.figure(figsize=(6, 5))
corr = df.corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("Feature Correlation Heatmap")
plt.show()

# ================================
# FEATURE vs TARGET ANALYSIS
# ================================
plt.figure()
sns.boxplot(x="stress", y="sleep", data=df)
plt.title("Stress vs Sleep")
plt.show()

plt.figure()
sns.boxplot(x="stress", y="work", data=df)
plt.title("Stress vs Work")
plt.show()

plt.figure()
sns.boxplot(x="stress", y="mood", data=df)
plt.title("Stress vs Mood")
plt.show()

plt.figure()
sns.boxplot(x="stress", y="social", data=df)
plt.title("Stress vs Social")
plt.show()
