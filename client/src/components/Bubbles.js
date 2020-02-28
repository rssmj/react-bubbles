import React, { useState, useEffect } from 'react';
import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

export const Bubbles = ({ colors }) => {
	const [bubbleData, setBubbleData] = useState([]);
	useEffect(() => {
		const generateBubbleData = colors.map((_, i) => ({
			value: Math.floor(Math.random() * (colors.length * 2)) + 1,
			key: `${i + 1}`
		}));
		setBubbleData(generateBubbleData);
	}, [colors]);

	return (
		<div className='bubble-wrap'>
			<p className='bubbleTitle'>bubbles</p>
			<Svg width={1000} height={1400}>
				<Pack
					data={{
						children: bubbleData
					}}
					sum={datum => datum.value}
					size={[1400, 1000]}
					includeRoot={false}
					nodeEnter={d => ({ ...d, r: 9999 })}
					animate
				>
					{nodes =>
						nodes
							.map(({ y, r, key }, i) => {
								if (i < colors.length) {
									return (
										<Circle
											key={key}
											cx={y}
											cy={r}
											r={r}
											fill={colors[i].code.hex}
										/>
									);
								}
								return null;
							})
							.filter(v => v)
					}
				</Pack>
			</Svg>
		</div>
	);
};

// export default Bubbles;
