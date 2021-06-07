import os
from math import sqrt

import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split


def load_music_data(file_name):
    """Get reviews data, from local csv."""
    if os.path.exists(file_name):
        df = pd.read_csv(file_name)

    return df


def values_to_map_index(values):
    map_index = {}
    idx = 0
    for val in values:
        map_index[val] = idx
        idx += 1

    return map_index


def predict(ratings, similarity, type='user'):
    if type == 'user':
        mean_user_rating = ratings.mean(axis=1)
        # You use np.newaxis so that mean_user_rating has same format as ratings
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array(
            [np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / \
            np.array([np.abs(similarity).sum(axis=1)])
    return pred


def rmse(prediction, ground_truth):
    prediction = prediction[ground_truth.nonzero()].flatten()
    ground_truth = ground_truth[ground_truth.nonzero()].flatten()
    return sqrt(mean_squared_error(prediction, ground_truth))


if __name__ == "__main__":

    # Load music data
    song_data = load_music_data("data/interactions.csv")

    user_idx = values_to_map_index(song_data.user.unique())
    song_idx = values_to_map_index(song_data.song.unique())

    n_users = song_data.user.unique().shape[0]
    n_items = song_data.song.unique().shape[0]
    print("Number of users = " + str(n_users) +
          " | Number of songs = " + str(n_items))

    train_data, test_data = train_test_split(song_data, test_size=0.05)
    train_data_matrix = np.zeros((n_users, n_items))
    for line in train_data.itertuples():
        train_data_matrix[user_idx[line[2]], song_idx[line[3]]] = line[1]

    test_data_matrix = np.zeros((n_users, n_items))
    for line in test_data.itertuples():
        test_data_matrix[user_idx[line[2]], song_idx[line[3]]] = line[1]

    sparsity = round(1.0 - len(song_data) / float(n_users * n_items), 3)
    print('The sparsity level is ' + str(sparsity * 100) + '%')

    # get SVD components from train matrix. Choose k.
    u, s, vt = svds(train_data_matrix, k=26)
    s_diag_matrix = np.diag(s)
    X_pred = np.dot(np.dot(u, s_diag_matrix), vt)
    print('User-based CF MSE: ' + str(rmse(X_pred, test_data_matrix)))
