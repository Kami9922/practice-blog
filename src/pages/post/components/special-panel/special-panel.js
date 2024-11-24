import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
	return (
		<div className={className}>
			<div className='published-at'>
				<Icon
					id='fa-calendar-o'
					margin='0px 10px 0px 0px'
					size='18px'
					onClick={() => {}}
				/>
				{publishedAt}
			</div>
			<div className='buttons'>
				{editButton}
				<Icon
					id='fa-trash-o'
					size='21px'
					onClick={() => {}}
				/>
			</div>
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& i {
		position: relative;
		top: -1px;
	}
	& .published-at {
		display: flex;
		font-size: 18px;
	}
	& .buttons {
		display: flex;
	}
`
