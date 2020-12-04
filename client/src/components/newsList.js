import React from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	Button,
} from '@material-ui/core';

export default function NewsList(props) {
	return (
		<div>
			<List className='root'>
				{props.data.map((item) => {
					return (
						<>
							<ListItem alignItems='flex-start' key={item.url}>
								<ListItemAvatar>
									<Avatar
										className='avatar'
										alt='Remy Sharp'
										src={`${item.urlToImage}`}
									/>
								</ListItemAvatar>
								<a
									href={item.url}
									target='_blank'
									rel='noopener noreferrer'>
									<ListItemText
										primary={item.title}
										secondary={
											<React.Fragment>
												<Typography
													component='span'
													variant='body2'
													className='inline'
													color='textPrimary'>
													{item.author}
												</Typography>{' '}
												<br />
												<Typography
													component='span'
													variant='body1'
													className='inline'
													color='textPrimary'>
													{item.description}
												</Typography>{' '}
												<br />
												{item.content}
												<br />
											</React.Fragment>
										}
									/>
								</a>
								<Button
									onClick={async () => {
										const token = JSON.parse(
											localStorage.getItem('userToken')
										);
										if (token) {
											if (props.action === 1) {
												await axios
													.post('/articles', {
														user: token.tokenUserId,
														title: item.title,
														description:
															item.description,
														content: item.content,
														url: item.url,
														image: item.image,
														author: item.author,
														pubilshedAt:
															item.pubilshedAt,
													})
													.then((response) => {
														alert(response.data);
													})
													.catch((err) => {
														throw err;
													});
											} else {
												await axios
													.delete('/articles', {
														data: {
															id: item._id,
														},
													})
													.then((response) => {
														alert(response.data);
														props.refresh();
													})
													.catch((err) => {
														throw err;
													});
											}
										} else {
											alert('You need to login first');
										}
									}}>
									{props.action === 1 ? 'Save' : 'Delete'}
								</Button>

								<Button hidden value={props.action} />
							</ListItem>

							<Divider variant='inset' component='li' />
						</>
					);
				})}
			</List>
		</div>
	);
}