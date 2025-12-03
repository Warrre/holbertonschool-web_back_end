#!/usr/bin/env python3
"""Simple helper function for pagination"""


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
        """
    Compute start and end indexes for pagination.

    Args:
        page (int): Current page number (1-indexed).
        page_size (int): Items per page.

    Returns:
        Tuple[int, int]:
        """
        start_index = (page - 1) * page_size
        end_index = page * page_size
        return start_index, end_index