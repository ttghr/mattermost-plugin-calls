// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {memo, HTMLAttributes} from 'react';
import styled, {css} from 'styled-components';

import CompassIcon from 'src/components/icons/compassIcon';

type Props = {
    size?: number;
    fontSize?: number;
    url?: string;
    username?: string;
    text?: string;
    icon?: string;
    border?: boolean;
    borderGlow?: boolean;
};

type Attrs = HTMLAttributes<HTMLElement>;

// Avatar's old size name: size (in px), font-size (in px)
// xxs: 16, 8; xs: 20, 9.5; sm: 24, 10; md: 32, 12; lg: 36, 14; xl: 50, 18; xxl: 128, 44
const Avatar = ({
    size = 32,
    fontSize = 12,
    url,
    username,
    text,
    icon,
    border = true,
    borderGlow = false,
    ...attrs
}: Props & Attrs) => {
    if (text) {
        return (
            <ProfilePlain
                {...attrs}
                data-content={text}
                size={size}
                fontSize={fontSize}
                border={border}
                borderGlow={borderGlow}
            />
        );
    }

    if (icon) {
        return (
            <ProfilePlain
                {...attrs}
                size={size}
                fontSize={fontSize}
                border={border}
                borderGlow={borderGlow}
            >
                <CompassIcon icon={icon}/>
            </ProfilePlain>
        );
    }

    return (
        <Img
            {...attrs}
            alt={`${username || 'user'} profile image`}
            src={url}
            size={size}
            fontSize={fontSize}
            border={border}
            borderGlow={borderGlow}
        />
    );
};

interface ProfileProps {
    size: number;
    fontSize: number;
    border?: boolean;
    borderGlow?: boolean;
}

const Profile = styled.div<ProfileProps>`
    &,
    &:focus,
    &.a11y--focused {
        border-radius: 50%;
    }

    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
    vertical-align: sub;
    background: var(--center-channel-bg);

    ${(props) => props.border && css`
        border: 1px solid var(--center-channel-bg);
    `}

    width: ${({size}) => size}px;
    min-width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    font-size: ${({fontSize}) => fontSize}px;

    :not(:first-child) {
        margin-left: -${({size}) => size * 0.25}px;
    }

    ${(props) => props.borderGlow && css`
        box-shadow: 0px 0px 4px 4px rgba(61, 184, 135, 0.8);
    `}
`;

const ProfilePlain = styled(Profile)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;

    &::before {
        position: absolute;
        display: inline-flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(var(--center-channel-color-rgb), 0.08);
        color: rgba(var(--center-channel-color-rgb), 0.72);
        content: attr(data-content);
    }
`;

const Img = Profile.withComponent('img');

export default memo(Avatar);
