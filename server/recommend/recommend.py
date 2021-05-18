import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds

df_movies = pd.read_csv('data/song.csv')

df_ratings = pd.read_csv('data/interactions.csv')

df_movie_features = df_ratings.pivot(
    index='user',
    columns='song',
    values='playing'
).fillna(0)

R = df_movie_features.values
user_ratings_mean = np.mean(R, axis=1)
R_demeaned = R - user_ratings_mean.reshape(-1, 1)

U, sigma, Vt = svds(R_demeaned, k=50)



# # test
# def values_to_map_index(values):
#     map_index = {}
#     idx = 0
#     for val in values:
#         map_index[val] = idx
#         idx += 1

#     return map_index
# test_data = df_ratings[df_ratings['user'] == "60a133ddbd26dd29687bc3da"]
# user_idx = values_to_map_index(df_ratings.user.unique())
# song_idx = values_to_map_index(df_ratings.song.unique())

# n_users = df_ratings.user.unique().shape[0]
# n_items = df_ratings.song.unique().shape[0]

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
# # end test


# Done.
# that the Sigma$ returned is just the values instead of a diagonal matrix.
# This is useful, but since I'm going to leverage matrix multiplication to get predictions
# I'll convert it to the diagonal matrix form.

sigma = np.diag(sigma)

all_user_predicted_ratings = np.dot(
    np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)

preds_df = pd.DataFrame(all_user_predicted_ratings, index=df_movie_features.index,
                        columns=df_movie_features.columns)

# print(preds_df)


def recommend_movies(preds_df, userID, movies_df, original_ratings_df, num_recommendations=5):

    # Get and sort the user's predictions
    sorted_user_predictions = preds_df.loc[userID].sort_values(
        ascending=False)
    user_data = original_ratings_df[original_ratings_df.user == (userID)]
    user_full = (user_data.merge(movies_df, how='left', left_on='song', right_on='song').
                 sort_values(['playing'], ascending=False)
                 )
    recommendations = (movies_df[~movies_df['song'].isin(user_full['song'])]).merge(pd.DataFrame(sorted_user_predictions).reset_index(), how='left', left_on='song',
                                                                                    right_on='song').rename(columns={userID: 'Predictions'}).sort_values('Predictions', ascending=False).iloc[:num_recommendations, :-1]

    return user_full, recommendations


already_rated, predictions = recommend_movies(
    preds_df, '60a133ddbd26dd29687bc3da', df_movies, df_ratings, 10)

print(already_rated.head(10))

print(predictions)
