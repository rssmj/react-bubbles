import React, { useState, useEffect } from 'react';
import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

export const Bubbles = ({ colors }) => {
	const [bubbleData, setBubbleData] = useState([]);
	useEffect(() => {
		const generateBubbleData = colors.map((_, i) => ({
			value: Math.floor(Math.random() * (colors.length * 7)) + 2,
			key: `${i + 1}`,
		}));
		setBubbleData(generateBubbleData);
	}, [colors]);

	return (
		<div className='bubble-wrap'>
			<Svg width={1200} height={1000}>
				<Pack
					data={{
						children: bubbleData,
					}}
					sum={datum => datum.value}
					size={[1800, 1800]}
					includeRoot={false}
					nodeEnter={d => ({ ...d, r: -1 })}
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
											cy={275}
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
			<div className='bubbleTitle'>bubbles</div>
		</div>
	);
};

// export default Bubbles;
