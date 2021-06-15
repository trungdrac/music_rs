import pandas as pd
import numpy as np
from math import sqrt
from sklearn.model_selection import train_test_split
from scipy.sparse.linalg import svds
from sklearn.metrics import mean_squared_error

df_songs = pd.read_csv('data/songs.csv')

df_interactions = pd.read_csv('data/interactions.csv')

# fill blank with 0
df_song_features = df_interactions.pivot(
    index='user',
    columns='song',
    values='playing'
).fillna(0)

R = df_song_features.to_numpy()

user_playings_mean = np.mean(R, axis=1)

R_demeaned = R - user_playings_mean.reshape(-1, 1)

train_data, test_data = train_test_split(R_demeaned, test_size=0.2)

U, sigma, Vt = svds(train_data, k=30)

sigma = np.diag(sigma)

all_user_predicted_playings = np.dot(np.dot(U, sigma), Vt)


def rmse(prediction, ground_truth):
    prediction = prediction[ground_truth.nonzero()].flatten()
    ground_truth = ground_truth[ground_truth.nonzero()].flatten()
    return sqrt(mean_squared_error(prediction, ground_truth))


print('RMSE: ' + str(rmse(all_user_predicted_playings, test_data)))
