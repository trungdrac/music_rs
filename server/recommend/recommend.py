import pandas as pd
import numpy as np
import sys
from scipy.sparse.linalg import svds

df_songs = pd.read_csv('recommend/data/songs.csv')

df_interactions = pd.read_csv('recommend/data/interactions.csv')

# fill 0 to blank values
df_song_features = df_interactions.pivot(
    index='user',
    columns='song',
    values='playing'
).fillna(0)

R = df_song_features.to_numpy()

# calculate average value per row
user_playings_mean = np.mean(R, axis=1)

# recalculate the numpy array with the value minus the mean
R_demeaned = R - user_playings_mean.reshape(-1, 1)

U, sigma, Vt = svds(R_demeaned, k=30)

# to a diagonal array
sigma = np.diag(sigma)

# predict
all_user_predicted_playings = np.dot(
    np.dot(U, sigma), Vt) + user_playings_mean.reshape(-1, 1)

# to data frame
preds_df = pd.DataFrame(all_user_predicted_playings, index=df_song_features.index,
                        columns=df_song_features.columns)


def recommend_songs(preds_df, userID, df_songs, df_interactions, num_recommendations=5):

    # Get and sort the user's predictions
    sorted_user_predictions = preds_df.loc[userID].sort_values(
        ascending=False)
    user_data = df_interactions[df_interactions.user == (userID)]
    user_full = (user_data.merge(df_songs, how='left', left_on='song', right_on='_id').
                 sort_values(['playing'], ascending=False)
                 )
    recommendations = (df_songs[~df_songs['_id'].isin(user_full['song'])]).merge(pd.DataFrame(sorted_user_predictions).reset_index(), how='left', left_on='_id',
                                                                                 right_on='song').rename(columns={userID: 'Predictions'}).sort_values('Predictions', ascending=False).iloc[:num_recommendations, :-1]

    return user_full, recommendations


already_rated, predictions = recommend_songs(
    preds_df, sys.argv[1], df_songs, df_interactions, 12)

# print(already_rated.head(10))
print(predictions.to_json())