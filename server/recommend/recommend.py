import pandas as pd
import numpy as np
import sys
from scipy.sparse.linalg import svds

df_songs = pd.read_csv('recommend/data/song.csv')

df_interactions = pd.read_csv('recommend/data/interactions.csv')

df_song_features = df_interactions.pivot(
    index='user',
    columns='song',
    values='playing'
).fillna(0)

R = df_song_features.values
user_playings_mean = np.mean(R, axis=1)
R_demeaned = R - user_playings_mean.reshape(-1, 1)

U, sigma, Vt = svds(R_demeaned, k=50)


# # get MSE
# def values_to_map_index(values):
#     map_index = {}
#     idx = 0
#     for val in values:
#         map_index[val] = idx
#         idx += 1

#     return map_index
# test_data = df_interactions[df_interactions['user'] == sys.argv[1]]
# user_idx = values_to_map_index(df_interactions.user.unique())
# song_idx = values_to_map_index(df_interactions.song.unique())

# n_users = df_interactions.user.unique().shape[0]
# n_items = df_interactions.song.unique().shape[0]

# test_data_matrix = np.zeros((n_users, n_items))
# for line in test_data.itertuples():
#         test_data_matrix[user_idx[line[2]], song_idx[line[3]]] = line[1]

# from sklearn.metrics import mean_squared_error
# from math import sqrt
# def rmse(prediction, ground_truth):
#     prediction = prediction[ground_truth.nonzero()].flatten()
#     ground_truth = ground_truth[ground_truth.nonzero()].flatten()
#     return sqrt(mean_squared_error(prediction, ground_truth))
# s_diag_matrix = np.diag(sigma)
# X_pred = np.dot(np.dot(U, s_diag_matrix), Vt)
# print ('User-based CF MSE: ' + str(rmse(X_pred, test_data_matrix)))

sigma = np.diag(sigma)

all_user_predicted_playings = np.dot(
    np.dot(U, sigma), Vt) + user_playings_mean.reshape(-1, 1)

preds_df = pd.DataFrame(all_user_predicted_playings, index=df_song_features.index,
                        columns=df_song_features.columns)

def recommend_songs(preds_df, userID, df_songs, df_interactions, num_recommendations=5):

    # Get and sort the user's predictions
    sorted_user_predictions = preds_df.loc[userID].sort_values(
        ascending=False)
    user_data = df_interactions[df_interactions.user == (userID)]
    user_full = (user_data.merge(df_songs, how='left', left_on='song', right_on='song').
                 sort_values(['playing'], ascending=False)
                 )
    recommendations = (df_songs[~df_songs['song'].isin(user_full['song'])]).merge(pd.DataFrame(sorted_user_predictions).reset_index(), how='left', left_on='song',
                                                                                    right_on='song').rename(columns={userID: 'Predictions'}).sort_values('Predictions', ascending=False).iloc[:num_recommendations, :-1]

    return user_full, recommendations


already_rated, predictions = recommend_songs(
    preds_df, sys.argv[1], df_songs, df_interactions, 12)

# print(already_rated.head(10))
print(predictions.to_json())

