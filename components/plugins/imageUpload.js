import * as React from 'react';
import { PluginComponent } from 'react-markdown-editor-lite';
import Modal from '../modal/Modal';
import axios from 'axios';
export default class imageUpload extends PluginComponent {
	static pluginName = 'unplash';
	static align = 'left';
	static defaultConfig = {
		query: '',
		open: false,
		loading: true,
		page: 1,
		image: [],
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.fetchImage = this.fetchImage.bind(this);
		this.selectImage = this.selectImage.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.state = {
			query: this.getConfig('query'),
			open: this.getConfig('open'),
			image: this.getConfig('image'),
			page: this.getConfig('page'),
			loading: this.getConfig('loading'),
		};
	}

	handleChange(e) {
		this.setState({
			query: e.target.value,
		});
	}

	async fetchImage(e) {
		e.preventDefault();
		const url = `http://localhost:5000/unsplash?page=${this.state.page}`;
		try {
			const response = await axios({
				method: 'post',
				url: url,
				data: {
					query: this.state.query,
				},
			});

			this.setState((prevState) => {
				return {
					...prevState,
					loading: !this.state.loading,
					image: response.data.results,
				};
			});
		} catch (error) {
			console.log(error);
		}
	}

	loadMore() {
		this.setState(
			(prevState) => {
				return { page: prevState.page + 1 };
			},
			async () => {
				const url = `http://localhost:5000/unsplash?page=${this.state.page}`;
				try {
					const response = await axios({
						method: 'post',
						url: url,
						data: {
							query: this.state.query,
						},
					});

					const results = response.data.results;
					this.setState((prevState) => {
						return { image: [...prevState.image, ...results] };
					});
				} catch (error) {
					console.log(error);
				}
			}
		);
	}

	handleClick() {
		this.setState({
			open: !this.state.open,
		});
	}

	selectImage(data) {
		this.editor.insertMarkdown('image', {
			imageUrl: data,
		});
		this.setState({
			open: false,
		});
	}

	render() {
		const input = (
			<>
				<input
					type="text"
					className="w-full bg-white px-3 py-2 rounded-lg focus:outline-none ring-1 ring-blue-400"
					name="query"
					placeholder="search image"
					autoComplete="off"
					onChange={this.handleChange}
				/>
				<button
					className="mt-2 px-4 py-2 rounded-lg text-blue-600 bg-blue-200"
					onClick={this.fetchImage}>
					submit
				</button>
			</>
		);
		return (
			<>
				<span
					className="button button-type-image"
					title="Unsplash"
					style={{ display: 'flex' }}
					onClick={this.handleClick}>
					<svg
						role="img"
						width={15}
						fill="#757575"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
					</svg>
				</span>
				<Modal
					showModal={this.state.open}
					setShowModal={this.handleClick}
					children={input}
					images={this.state.image}
					loading={this.state.loading}
					selectImage={this.selectImage}
					loadMore={this.loadMore}
				/>
			</>
		);
	}
}
